const countryData = [
    { id: 1, name: "Brazil", code: "br" },
    { id: 2, name: "United States", code: "us" },
    { id: 3, name: "Canada", code: "ca" },
    { id: 4, name: "Australia", code: "au" },
    { id: 5, name: "United Kingdom", code: "gb" },
    { id: 6, name: "Germany", code: "de" },
    { id: 7, name: "France", code: "fr" },
    { id: 8, name: "Italy", code: "it" },
    { id: 9, name: "Japan", code: "jp" },
    { id: 10, name: "China", code: "cn" },
    { id: 11, name: "India", code: "in" },
    { id: 12, name: "Russia", code: "ru" },
    { id: 13, name: "Mexico", code: "mx" },
    { id: 14, name: "Argentina", code: "ar" },
    { id: 15, name: "South Africa", code: "za" },
    { id: 16, name: "South Korea", code: "kr" },
    { id: 17, name: "Spain", code: "es" },
    { id: 18, name: "Netherlands", code: "nl" },
    { id: 19, name: "Sweden", code: "se" },
    { id: 20, name: "Switzerland", code: "ch" },
    { id: 21, name: "Norway", code: "no" },
    { id: 22, name: "Denmark", code: "dk" },
    { id: 23, name: "Finland", code: "fi" },
    { id: 24, name: "Belgium", code: "be" },
    { id: 25, name: "Austria", code: "at" },
    { id: 26, name: "Greece", code: "gr" },
    { id: 27, name: "Portugal", code: "pt" },
    { id: 28, name: "Poland", code: "pl" },
    { id: 29, name: "Turkey", code: "tr" },
    { id: 30, name: "New Zealand", code: "nz" },
    { id: 31, name: "Ireland", code: "ie" },
    { id: 32, name: "Egypt", code: "eg" },
    { id: 33, name: "Saudi Arabia", code: "sa" },
    { id: 34, name: "United Arab Emirates", code: "ae" },
    { id: 35, name: "Chile", code: "cl" },
    { id: 36, name: "Colombia", code: "co" },
    { id: 37, name: "Peru", code: "pe" }
];

export default function getCountryIdByName(countryName: string): number | null {
    const country = countryData.find(
        (c) => c.name.toLowerCase() === countryName.toLowerCase()
    );
    return country ? country.id : null;
}
