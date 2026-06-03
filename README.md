# bd-location-data

বাংলাদেশের সকল **বিভাগ, জেলা, থানা ও পোস্টকোড** — ইংরেজি ও বাংলা উভয় ভাষায়।

Bangladesh all **divisions, districts, thanas & postcodes** — in both English and Bangla.

---

## Install

```bash
npm install @bd-geo-data/bd-location-data
```

---

## ডেটা সংখ্যা / Data Coverage

| ধরন | সংখ্যা |
|---|---|
| বিভাগ (Divisions) | ৮ |
| জেলা (Districts) | ৬৪ |
| থানা/উপজেলা (Thanas) | ৫৫৫ |
| পোস্টকোড (Postcodes) | ৫৫৫ |
| ভাষা (Languages) | বাংলা + English |

---

## Usage

```js
import bd from "@bd-geo-data/bd-location-data";
```

### বিভাগ / Divisions

```js
bd.allDivisions()         // ইংরেজিতে সব বিভাগ
// ['BARISAL', 'CHITTAGONG', 'COMILLA', 'DHAKA', ...]

bd.allDivisions('bn')     // বাংলায় সব বিভাগ
// ['বরিশাল', 'চট্টগ্রাম', 'কুমিল্লা', 'ঢাকা', ...]
```

### জেলা / Districts

```js
bd.allDistricts()               // সব জেলা (ইংরেজি)
bd.allDistricts('bn')           // সব জেলা (বাংলা)

bd.districtsOf('DHAKA')         // ঢাকা বিভাগের জেলা (ইংরেজি)
bd.districtsOf('DHAKA', 'bn')   // ঢাকা বিভাগের জেলা (বাংলা)
// ['ঢাকা', 'ফরিদপুর', 'গাজীপুর', ...]
```

### থানা / Thanas

```js
bd.allThanas()                    // সব থানা (ইংরেজি)
bd.allThanas('bn')                // সব থানা (বাংলা)

bd.thanasOf('GAZIPUR')            // গাজীপুরের থানা (ইংরেজি)
bd.thanasOf('GAZIPUR', 'bn')      // গাজীপুরের থানা (বাংলা)
// ['গাজীপুর সদর', 'কালিয়াকৈর', 'কালীগঞ্জ', ...]

// পোস্টকোড সহ থানা
bd.thanasWithPostcodeOf('GAZIPUR')
// [{ name: 'GAZIPUR SADAR', postcode: '1700' }, ...]

bd.thanasWithPostcodeOf('GAZIPUR', 'bn')
// [{ name: 'গাজীপুর সদর', postcode: '1700' }, ...]
```

### পোস্টকোড / Postcodes

```js
// পোস্টকোড দিয়ে থানা খোঁজা
bd.findByPostcode('1212')
// [
//   { division: 'DHAKA', divisionBn: 'ঢাকা', district: 'DHAKA', districtBn: 'ঢাকা',
//     thana: 'BADDA', thanaBn: 'বাড্ডা', postcode: '1212' },
//   { ..., thana: 'GULSHAN', thanaBn: 'গুলশান', postcode: '1212' }
// ]

// সব থানা পোস্টকোড সহ
bd.allThanasWithPostcode()
// [{ division, divisionBn, district, districtBn, thana, thanaBn, postcode }, ...]
```

### খোঁজা / Search

```js
// ইংরেজিতে খোঁজা
bd.search('mirpur')
// [{ name: 'MIRPUR', bn: 'মিরপুর', type: 'thana', postcode: '1216',
//    district: 'DHAKA', division: 'DHAKA' }, ...]

// বাংলায় খোঁজা
bd.search('মিরপুর')

// বিভাগ, জেলা, থানা সব লেভেলে খোঁজে
bd.search('sylhet')
```

### সম্পূর্ণ ডেটা / Full Data

```js
bd.getAllData()
// সম্পূর্ণ JSON ডেটা রিটার্ন করে
```

---

## ডেটা স্ট্রাকচার / Data Structure

```json
{
  "divisions": [
    {
      "name": "DHAKA",
      "bn": "ঢাকা",
      "districts": [
        {
          "name": "GAZIPUR",
          "bn": "গাজীপুর",
          "thana": [
            { "name": "GAZIPUR SADAR", "bn": "গাজীপুর সদর", "postcode": "1700" },
            { "name": "TONGI",         "bn": "টঙ্গী",        "postcode": "1710" }
          ]
        }
      ]
    }
  ]
}
```

---

## পোস্টকোড রেঞ্জ / Postcode Ranges

| জেলা | রেঞ্জ |
|---|---|
| Dhaka | 1000–1399 |
| Chittagong | 4000–4399 |
| Rajshahi | 6000–6299 |
| Khulna | 9000–9299 |
| Sylhet | 3100–3199 |
| Barisal | 8200–8299 |
| Rangpur | 5400–5499 |
| Mymensingh | 2200–2299 |

---

## License

MIT
