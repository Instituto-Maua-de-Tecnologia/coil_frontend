export default interface IAllProjects {
    id: string;
    title: string;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
    courses: {
        course_id: number;
        course: {
            id: number;
            course: string;
        };
    }[];
    languages: {
        language_id: number;
        language: {
            id: number;
            language: string;
            language_code: string;
        };
    }[];
    criterias: {
        criteria_id: number;
        criteria: {
            id: number;
            criteria: string;
        };
    }[];
    partner_institutions: {
        institution_id: string;
        institution: {
            id: string;
            name: string;
            description: string;
            email: string;
            social_medias: {
                id: number;
                institution_id: string;
                social_media_id: number;
                link: string;
                media: {
                    id: number;
                    name: string;
                };
            }[];
            countries: {
                id: number;
                institution_id: string;
                country_id: number;
                country: {
                    id: number;
                    country: string;
                    country_code: string;
                };
            }[];
            images: {
                image: string;
            }[];
        };
    }[];
    activity_status: {
        id: number;
        name: string;
    };
    activity_type: {
        id: number;
        name: string;
    };
}
