const data = require('./data.json');

// সব বিভাগ পান
function allDivisions(lang = 'en') {
  return data.divisions.map(d => lang === 'bn' ? d.bn : d.name);
}

// বিভাগের সব জেলা পান
function districtsOf(divisionName, lang = 'en') {
  const division = data.divisions.find(
    d => d.name.toLowerCase() === divisionName.toLowerCase() || d.bn === divisionName
  );
  if (!division) return [];
  return division.districts.map(d => lang === 'bn' ? d.bn : d.name);
}

// জেলার সব থানা পান
function thanasOf(districtName, lang = 'en') {
  for (const division of data.divisions) {
    const district = division.districts.find(
      d => d.name.toLowerCase() === districtName.toLowerCase() || d.bn === districtName
    );
    if (district) return district.thana.map(t => lang === 'bn' ? t.bn : t.name);
  }
  return [];
}

// জেলার থানা + পোস্টকোড সহ পান
function thanasWithPostcodeOf(districtName, lang = 'en') {
  for (const division of data.divisions) {
    const district = division.districts.find(
      d => d.name.toLowerCase() === districtName.toLowerCase() || d.bn === districtName
    );
    if (district) {
      return district.thana.map(t => ({
        name: lang === 'bn' ? t.bn : t.name,
        postcode: t.postcode
      }));
    }
  }
  return [];
}

// পোস্টকোড দিয়ে থানা খোঁজা
function findByPostcode(postcode) {
  const results = [];
  for (const division of data.divisions) {
    for (const district of division.districts) {
      for (const thana of district.thana) {
        if (thana.postcode === postcode) {
          results.push({
            division: division.name, divisionBn: division.bn,
            district: district.name, districtBn: district.bn,
            thana: thana.name, thanaBn: thana.bn,
            postcode: thana.postcode
          });
        }
      }
    }
  }
  return results;
}

// সব জেলা পান
function allDistricts(lang = 'en') {
  return data.divisions.flatMap(d => d.districts.map(dist => lang === 'bn' ? dist.bn : dist.name));
}

// সব থানা পান
function allThanas(lang = 'en') {
  return data.divisions.flatMap(d =>
    d.districts.flatMap(dist => dist.thana.map(t => lang === 'bn' ? t.bn : t.name))
  );
}

// সব থানা পোস্টকোড সহ
function allThanasWithPostcode() {
  return data.divisions.flatMap(d =>
    d.districts.flatMap(dist =>
      dist.thana.map(t => ({
        division: d.name, divisionBn: d.bn,
        district: dist.name, districtBn: dist.bn,
        thana: t.name, thanaBn: t.bn,
        postcode: t.postcode
      }))
    )
  );
}

// সম্পূর্ণ ডেটা পান
function getAllData() {
  return data;
}

// নাম দিয়ে খোঁজা
function search(query) {
  const results = [];
  const q = query.toLowerCase();
  for (const division of data.divisions) {
    if (division.name.toLowerCase().includes(q) || division.bn.includes(query)) {
      results.push({ name: division.name, bn: division.bn, type: 'division' });
    }
    for (const district of division.districts) {
      if (district.name.toLowerCase().includes(q) || district.bn.includes(query)) {
        results.push({ name: district.name, bn: district.bn, type: 'district', division: division.name, divisionBn: division.bn });
      }
      for (const thana of district.thana) {
        if (thana.name.toLowerCase().includes(q) || thana.bn.includes(query)) {
          results.push({
            name: thana.name, bn: thana.bn, type: 'thana',
            postcode: thana.postcode,
            district: district.name, districtBn: district.bn,
            division: division.name, divisionBn: division.bn
          });
        }
      }
    }
  }
  return results;
}

module.exports = {
  allDivisions,
  allDistricts,
  allThanas,
  allThanasWithPostcode,
  districtsOf,
  thanasOf,
  thanasWithPostcodeOf,
  findByPostcode,
  getAllData,
  search
};
