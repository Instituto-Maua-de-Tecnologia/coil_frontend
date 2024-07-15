export default interface IResults {
    id?: string;
    title?: string;
    start_date?: string;
    end_date?: string;
    description?: string;
    languages?: [
        {
            id: number;
            language: string;
            language_code: string;
        }
    ];
    partner_institutions?: [
        {
            id: string;
            name: string;
            email: string;
            countries: [
                {
                    id: number;
                    country: {
                        id?: number;
                        country?: string;
                        country_code?: string;
                    };
                }
            ];
            images: string[];
            social_medias: string[];
        }
    ];
    criterias?: [
        {
            id: number;
            criteria: string;
        }
    ];
    status_activity?: number;
    type_activity?: number;
    created_at?: string;
    updated_at?: string;
    applicants?: [
        {
            status?: boolean;
        }
    ];
    courses?: [
        {
            id: number;
            course: string;
        }
    ];
}
