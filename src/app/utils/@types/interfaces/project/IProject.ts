export default interface IProject {
    id: string;
    title: string;
    start_date: string;
    end_date: string;
    description: string;
    languages: [
        {
            id: number;
            language: {
                id: number;
                language: string;
                language_code: string;
            };
        }
    ];
    partner_institutions: [
        {
            id: string;
            institution: {
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
                social_medias: [
                    {
                        id: number;
                        media: {
                            id: number;
                            social_media: string;
                        };
                        link: string;
                    }
                ];
            };
        }
    ];
    criterias: [
        {
            id: number;
            criteria: {
                id: number;
                criteria: string;
            };
        }
    ];
    status_activity: number;
    type_activity: number;
    created_at: string;
    updated_at: string;
    applicants: [
        {
            id: string;
            user: {
                id: string;
                name: string;
                email: string;
                user_type: number;
                created_at: string;
                updated_at: string;
            };
            status: boolean;
        }
    ];
    courses: [
        {
            id: number;
            course: {
                id: number;
                course: string;
            };
        }
    ];
}
