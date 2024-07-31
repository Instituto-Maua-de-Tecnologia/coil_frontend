export default interface IInstitutionRequirements {
    countries: [
        {
            id: number;
            country: string;
            country_code: string;
        }
    ];
    social_medias: [
        {
            id: number;
            social_media: string;
        }
    ];
}
