type CountryMap = {
    [id: number]: {
        name: string;
        code: string;
    };
};

const countryMap: CountryMap = {
    1: { name: "Brazil", code: "br" },
    2: { name: "United States", code: "us" },
    3: { name: "Canada", code: "ca" },
    4: { name: "Australia", code: "au" },
    5: { name: "United Kingdom", code: "gb" },
    6: { name: "Germany", code: "de" },
    7: { name: "France", code: "fr" },
    8: { name: "Italy", code: "it" },
    9: { name: "Japan", code: "jp" },
    10: { name: "China", code: "cn" },
    11: { name: "India", code: "in" },
    12: { name: "Russia", code: "ru" },
    13: { name: "Mexico", code: "mx" },
    14: { name: "Argentina", code: "ar" },
    15: { name: "South Africa", code: "za" },
    16: { name: "South Korea", code: "kr" },
    17: { name: "Spain", code: "es" },
    18: { name: "Netherlands", code: "nl" },
    19: { name: "Sweden", code: "se" },
    20: { name: "Switzerland", code: "ch" },
    21: { name: "Norway", code: "no" },
    22: { name: "Denmark", code: "dk" },
    23: { name: "Finland", code: "fi" },
    24: { name: "Belgium", code: "be" },
    25: { name: "Austria", code: "at" },
    26: { name: "Greece", code: "gr" },
    27: { name: "Portugal", code: "pt" },
    28: { name: "Poland", code: "pl" },
    29: { name: "Turkey", code: "tr" },
    30: { name: "New Zealand", code: "nz" },
    31: { name: "Ireland", code: "ie" },
    32: { name: "Egypt", code: "eg" },
    33: { name: "Saudi Arabia", code: "sa" },
    34: { name: "United Arab Emirates", code: "ae" },
    35: { name: "Chile", code: "cl" },
    36: { name: "Colombia", code: "co" },
    37: { name: "Peru", code: "pe" }
};

function getCountryNameById(id: number): string | undefined {
    return countryMap[id]?.name;
}

function getCountryCodeById(id: number): string | undefined {
    return countryMap[id]?.code;
}

function getIdByCountryName(name: string): number | undefined {
    const entry = Object.entries(countryMap).find(
        ([_, value]) => value.name === name
    );
    return entry ? parseInt(entry[0]) : undefined;
}

function getIdByCountryCode(code: string): number | undefined {
    const entry = Object.entries(countryMap).find(
        ([_, value]) => value.code === code
    );
    return entry ? parseInt(entry[0]) : undefined;
}

console.log(getCountryNameById(1));
console.log(getCountryCodeById(1));
console.log(getIdByCountryName("Canada"));
console.log(getIdByCountryCode("us"));
