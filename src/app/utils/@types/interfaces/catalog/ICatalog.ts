export default interface ICatalog {
    projects: [
        {
            title: string;
            logo: string;
            type_activity: number;
        }
    ];
    mobilities: [
        {
            title: string;
            logo: string;
            type_activity: number;
        }
    ];
    institutions: [
        {
            id: string;
            name: string;
            description: string;
            email: string;
            countries: [
                {
                    id: number;
                    country: {
                        id: number;
                        country: string;
                        country_code: string;
                    };
                }
            ];
            images: string[];
            social_medias: string[];
        }
    ];
}
