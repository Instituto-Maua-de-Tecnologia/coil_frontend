export default interface IEnrolled {
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
