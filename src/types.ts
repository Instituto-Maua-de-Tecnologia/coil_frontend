export interface Student {
    id: number;
    ra: string;
    name: string;
    course: string;
    approval: boolean;
}

export interface Project {
    activity_status: {
        id: number;
        name: string;
    };
    activity_type: {
        id: number;
        name: string;
    };
    courses: [
        {
            course: {
                name: string;
            };
            course_id: number;
        }
    ];
    created_at: string;
    end_date: string;
    id: string;
    languages: [
        {
            language: string;
        }
    ];
    partner_institutions: [
        {
            institution: {
                country: string;
                id: string;
                images: [
                    {
                        image: string;
                    }
                ];
                name: string;
            };
            institution_id: string;
        }
    ];
    start_date: string;
    title: string;
    updated_at: string;

    // id: string;
    // avatarUrl: string;
    // title: string;
    // partnerName: string;
    // status: string;
    // languages: string[];
    // country: string;
    // start_date: string;
    // end_date: string;
}

export interface Mobility {
    activity_status: {
        id: number;
        name: string;
    };
    activity_type: {
        id: number;
        name: string;
    };
    courses: [
        {
            course: {
                name: string;
            };
            course_id: number;
        }
    ];
    created_at: string;
    end_date: string;
    id: string;
    languages: [
        {
            language: string;
        }
    ];
    partner_institutions: [
        {
            institution: {
                country: string;
                id: string;
                images: [
                    {
                        image: string;
                    }
                ];
                name: string;
            };
            institution_id: string;
        }
    ];
    start_date: string;
    title: string;
    updated_at: string;
}

export interface Enrolled {
    id?: string;
    title?: string;
    description?: string;
    status_id?: number;
    type_id?: number;
    start_date?: string;
    end_date?: string;
    created_at?: string;
    updated_at?: string;
    courses?: [
        {
            course_id?: number;
            course?: {
                name: string;
            };
        }
    ];
    languages?: [
        {
            language?: string;
        }
    ];
    partner_institutions?: [
        {
            institution_id?: string;
            institution?: {
                id: string;
                name: string;
                country: string;
                images: [
                    {
                        image?: string;
                    }
                ];
            };
        }
    ];
    activity_status?: {
        id: number;
        name: string;
    };
    activity_type?: {
        id: number;
        name: string;
    };
    applications?: [
        {
            id?: number;
            user_id?: string;
            activity_id?: string;
            status?: boolean;
            created_at?: string;
            updated_at?: string;
        }
    ];
}

export interface Result {
    id: number;
    avatarUrl: string;
    title: string;
    partnerName: string;
    status: string;
    languages: string[];
    country: string;
    approvation: string;
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
    netherlands: "nl",
    "united states": "us",
    "united kingdom": "gb",
    france: "fr",
    germany: "de",
    italy: "it",
    spain: "es",
    japan: "jp",
    china: "cn",
    brazil: "br",
    india: "in",
    russia: "ru",
    canada: "ca",
    australia: "au",
    mexico: "mx",
    argentina: "ar",
    "south africa": "za",
    switzerland: "ch",
    sweden: "se",
    norway: "no",
    denmark: "dk",
    finland: "fi",
    portugal: "pt",
    greece: "gr",
    "south korea": "kr",
    "saudi arabia": "sa",
    "united arab emirates": "ae",
    egypt: "eg",
    indonesia: "id",
    thailand: "th",
    turkey: "tr",
    nigeria: "ng",
    kenya: "ke",
    colombia: "co",
    venezuela: "ve",
    peru: "pe",
    bolivia: "bo",
    chile: "cl",
    ecuador: "ec",
    uruguay: "uy",
    panama: "pa",
    "costa rica": "cr",
    "dominican republic": "do",
    cuba: "cu",
    jamaica: "jm",
    barbados: "bb",
    "trinidad and tobago": "tt",
    philippines: "ph",
    vietnam: "vn",
    malaysia: "my",
    singapore: "sg",
    "hong kong": "hk",
    taiwan: "tw",
    portuguese: "br", // Brasil
    dutch: "nl", // Netherlands (Países Baixos)
    english: "us", // United States (Estados Unidos)
    english_gb: "gb", // United Kingdom (Reino Unido)
    french: "fr", // France (França)
    german: "de", // Germany (Alemanha)
    italian: "it", // Italy (Itália)
    spanish: "es", // Spain (Espanha)
    japanese: "jp", // Japan (Japão)
    chinese: "cn", // China (China)
    hindi: "in", // India (Índia)
    russian: "ru", // Russia (Rússia)
    zulu: "za", // South Africa (África do Sul)
    swedish: "se", // Sweden (Suécia)
    norwegian: "no", // Norway (Noruega)
    danish: "dk", // Denmark (Dinamarca)
    finnish: "fi", // Finland (Finlândia)
    greek: "gr", // Greece (Grécia)
    korean: "kr", // South Korea (Coreia do Sul)
    arabic: "sa", // Saudi Arabia (Arábia Saudita)
    indonesian: "id", // Indonesia (Indonésia)
    thai: "th", // Thailand (Tailândia)
    turkish: "tr", // Turkey (Turquia)
    swahili: "ke", // Kenya (Quênia)
    quechua: "bo", // Bolivia (Bolívia)
    aymara: "bo", // Bolivia (Bolívia)
    tamil: "in", // India (Índia)
    punjabi: "in", // India (Índia)
    catalan: "es", // Spain (Espanha)
    basque: "es", // Spain (Espanha)
    tagalog: "ph", // Philippines (Filipinas)
    vietnamese: "vn", // Vietnam (Vietnã)
    malay: "my", // Malaysia (Malásia)
    sinhalese: "lk", // Sri Lanka (Sri Lanka)
    filipino: "ph", // Philippines (Filipinas)
    khmer: "kh", // Cambodia (Camboja)
    lao: "la", // Laos (Laos)
    burmese: "mm", // Myanmar (Mianmar)
    mongolian: "mn", // Mongolia (Mongólia)
    nepali: "np", // Nepal (Nepal)
    bengali: "bd", // Bangladesh (Bangladesh)
    telugu: "in", // India (Índia)
    marathi: "in", // India (Índia)
    gujarati: "in", // India (Índia)
    kannada: "in", // India (Índia)
    malayalam: "in", // India (Índia)
    oriya: "in", // India (Índia)
    urdu: "pk", // Pakistan (Paquistão)
    pashto: "af", // Afghanistan (Afeganistão)
    persian: "ir", // Iran (Irã)
    armenian: "am", // Armenia (Armênia)
    georgian: "ge", // Georgia (Geórgia)
    hebrew: "il", // Israel (Israel)
    maltese: "mt", // Malta (Malta)
    slovak: "sk", // Slovakia (Eslováquia)
    slovenian: "si", // Slovenia (Eslovênia)
    latvian: "lv", // Latvia (Letônia)
    lithuanian: "lt", // Lithuania (Lituânia)
    estonian: "ee", // Estonia (Estônia)
    bulgarian: "bg", // Bulgaria (Bulgária)
    romanian: "ro", // Romania (Romênia)
    hungarian: "hu", // Hungary (Hungria)
    croatian: "hr", // Croatia (Croácia)
    serbian: "rs", // Serbia (Sérvia)
    bosnian: "ba", // Bosnia and Herzegovina (Bósnia e Herzegovina)
    albanian: "al", // Albania (Albânia)
    macedonian: "mk", // North Macedonia (Macedônia do Norte)
    greek_cy: "cy", // Cyprus (Chipre)
    bulgarian_gr: "gr", // Greece (Grécia)
    turkish_gr: "gr", // Greece (Grécia)
    romanian_gr: "gr", // Greece (Grécia)
    serbian_ba: "ba", // Bosnia and Herzegovina (Bósnia e Herzegovina)
    croatian_ba: "ba" // Bosnia and Herzegovina (Bósnia e Herzegovina)
};
