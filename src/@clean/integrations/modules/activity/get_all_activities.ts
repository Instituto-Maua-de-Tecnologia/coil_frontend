import axios, { AxiosError } from "axios";

interface GetAllActivityProps {
    type_activity: string;
}

interface GetAllActivityResponse {
    message: string;
    data: [
        {
            id?: string;
            title?: string;
            start_date?: string;
            end_date?: string;
            created_at?: string;
            updated_at?: string;
            courses?: [
                {
                    course_id: number;
                    course: {
                        id: number;
                        course: string;
                    };
                }
            ];
            languages?: [
                {
                    language_id: number;
                    language: {
                        id: number;
                        language: string;
                        language_code: string;
                    };
                }
            ];
            criterias?: {
                criteria_id: number;
                criteria: [
                    {
                        id: number;
                        criteria: string;
                    }
                ];
            };
            partner_institutions?: [
                {
                    institution_id?: string;
                    institution?: {
                        id: string;
                        name: string;
                        description: string;
                        email: string;
                        social_medias: [
                            {
                                id?: number;
                                institution_id?: string;
                                social_media_id?: number;
                                link?: string;
                                media?: {
                                    id: number;
                                    name: string;
                                };
                            }
                        ];
                        countries: [
                            {
                                id?: number;
                                institution_id?: string;
                                country_id?: number;
                                country?: {
                                    id: number;
                                    country: string;
                                    country_code: string;
                                };
                            }
                        ];
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
        }
    ];
}

export default async function getAllActivities(props: GetAllActivityProps) {
    const token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .get(`${endpoint}/get-all-activities`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token as string
                },
                params: {
                    type_activity: props.type_activity
                }
            })
            .then((response) => {
                const responseData: GetAllActivityResponse =
                    response.data as GetAllActivityResponse;
                resolve(responseData.data);
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<GetAllActivityResponse> =
                    error as AxiosError<GetAllActivityResponse>;
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
//TODO: colocar em todas as rotas o negócio de 401 retornar ele pra hero page dando um aviso que o token
