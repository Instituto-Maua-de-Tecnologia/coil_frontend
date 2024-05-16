import axios, { AxiosError } from "axios";

interface GetAllActivitiesEnrolledProps {
    type_activity?: number;
}

interface GetAllActivitiesEnrolledResponse {
    message: string;
    data: [
        {
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
    ];
}

export default async function getAllActivitiesEnrolled({
    type_activity
}: GetAllActivitiesEnrolledProps) {
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
                const responseData: GetAllActivitiesEnrolledResponse =
                    response.data as GetAllActivitiesEnrolledResponse;
                resolve(responseData.data);
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<GetAllActivitiesEnrolledResponse> =
                    error as AxiosError<GetAllActivitiesEnrolledResponse>;
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
