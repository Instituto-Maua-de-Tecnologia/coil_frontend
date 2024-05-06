export interface Project {
    id: number;
    avatarUrl: string;
    title: string;
    partnerName: string;
    status: string;
    languages: string[];
    country: string;
}

export interface Mobility {
    id: number;
    avatarUrl: string;
    title: string;
    partnerName: string;
    status: string;
    languages: string[];
    country: string;
}

export interface Institution {
    id: number;
    avatarUrl: string;
    name: string;
    email: string;
    country: string;
    website: string;
}

export const countryCodes: { [key: string]: string } = {
    nl: "Netherlands",
    us: "United States",
    gb: "United Kingdom",
    fr: "France",
    de: "Germany",
    it: "Italy",
    es: "Spain",
    jp: "Japan",
    cn: "China",
    br: "Brazil",
    in: "India",
    ru: "Russia",
    ca: "Canada",
    au: "Australia",
    mx: "Mexico",
    ar: "Argentina",
    za: "South Africa",
    ch: "Switzerland",
    se: "Sweden",
    no: "Norway",
    dk: "Denmark",
    fi: "Finland",
    pt: "Portugal",
    gr: "Greece",
    kr: "South Korea",
    sa: "Saudi Arabia",
    ae: "United Arab Emirates",
    eg: "Egypt",
    id: "Indonesia",
    th: "Thailand",
    tr: "Turkey",
    ng: "Nigeria",
    ke: "Kenya",
    co: "Colombia",
    ve: "Venezuela",
    pe: "Peru",
    bo: "Bolivia",
    cl: "Chile",
    ec: "Ecuador",
    uy: "Uruguay",
    pa: "Panama",
    cr: "Costa Rica",
    do: "Dominican Republic",
    cu: "Cuba",
    jm: "Jamaica",
    bb: "Barbados",
    tt: "Trinidad and Tobago",
    ph: "Philippines",
    vn: "Vietnam",
    my: "Malaysia",
    sg: "Singapore",
    hk: "Hong Kong",
    tw: "Taiwan"
};
