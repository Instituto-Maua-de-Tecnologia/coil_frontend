import axios, { AxiosError } from "axios";

interface GetAllActivitiesProps {
    type_activity: number;
}

interface GetAllActivitiesResponse {
    message: string;
    data: [
        {
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
    ];
}

export default async function getAllActivitiesEnrolled({
    type_activity
}: GetAllActivitiesProps) {
    const token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .get(
                `${endpoint}/get-all-activities-enrolled?type_activity=${type_activity}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token as string
                    }
                }
            )
            .then((response) => {
                const responseData: GetAllActivitiesResponse =
                    response.data as GetAllActivitiesResponse;
                resolve(responseData);
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<GetAllActivitiesResponse> =
                    error as AxiosError<GetAllActivitiesResponse>;
                const errorResponse = convertedError.response;
                if (errorResponse) {
                    reject({
                        status: errorResponse.status,
                        message: errorResponse.data.message
                    });
                }
            });
    });
}
