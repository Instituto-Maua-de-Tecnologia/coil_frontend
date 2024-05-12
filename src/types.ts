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
    // partner_institutions?: [
    //     {
    //         institution_id?: string;
    //         institution?: {
    //             id: string;
    //             name: string;
    //             country: string;
    //             images: [
    //                 {
    //                     image?: string;
    //                 }
    //             ];
    //         };
    //     }
    // ];
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
    united_states: "us",
    united_kingdom: "gb",
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
    south_africa: "za",
    switzerland: "ch",
    sweden: "se",
    norway: "no",
    denmark: "dk",
    finland: "fi",
    portugal: "pt",
    greece: "gr",
    south_korea: "kr",
    saudi_arabia: "sa",
    united_arab_emirates: "ae",
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
    costa_rica: "cr",
    dominican_republic: "do",
    cuba: "cu",
    jamaica: "jm",
    barbados: "bb",
    trinidad_and_tobago: "tt",
    philippines: "ph",
    vietnam: "vn",
    malaysia: "my",
    singapore: "sg",
    hong_kong: "hk",
    taiwan: "tw",
    english: "us",
    portuguese: "br",
    french: "fr",
    german: "de",
    italian: "it",
    spanish: "es",
    japanese: "jp",
    mandarin: "cn",
    dutch: "nl",
    hindi: "in",
    russian: "ru",
    swedish: "se",
    norwegian: "no",
    danish: "dk",
    finnish: "fi",
    greek: "gr",
    korean: "kr",
    arabic: "sa",
    indonesian: "id",
    thai: "th",
    turkish: "tr",
    zulu: "za",
    xhosa: "za",
    afrikaans: "za",
    romansh: "ch"
};
