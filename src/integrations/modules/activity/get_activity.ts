import axios, { AxiosError } from "axios";

interface GetActivityProps {
    activity_id: string;
}

interface GetActivityResponse {
    message: string;
    data: {
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
                id?: string;
                institution?: {
                    id: string;
                    name: string;
                    description: string;
                    email: string;
                    countries: [
                        {
                            id?: number;
                            country?: {
                                id: number;
                                country: string;
                                country_code: string;
                            };
                        }
                    ];
                    images: string[];
                    social_medias: [
                        {
                            id?: number;
                            media?: {
                                id: number;
                                social_media: string;
                            };
                            link?: string;
                        }
                    ];
                };
            }
        ];
        criterias: {
            id: number;
            criteria: {
                id: number;
                criteria: string;
            };
        }[];
        status_activity: number;
        type_activity: number;
        created_at: string;
        updated_at: string;
        applicants: [
            {
                id?: string;
                user?: {
                    id: string;
                    name: string;
                    email: string;
                    user_type: number;
                    created_at: string;
                    updated_at: string;
                };
                status?: boolean;
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
    };
}

export default async function getActivity(props: GetActivityProps) {
    const token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .get(`${endpoint}/get-activity?activity_id=${props.activity_id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token as string
                }
            })
            .then((response) => {
                const responseData: GetActivityResponse =
                    response.data as GetActivityResponse;
                resolve(responseData);
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<GetActivityResponse> =
                    error as AxiosError<GetActivityResponse>;
                const errorResponse = convertedError.response;
                if (errorResponse) {
                    reject({
                        status: errorResponse.status,
                        message: errorResponse.data
                    });
                }
            });
    });
}
