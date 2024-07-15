export default interface IInstitution {
    id: string;
    name: string;
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
    social_medias: {
        id: number;
        media: {
            id: number;
            social_media: string;
        };
        link: string;
    }[];
}
