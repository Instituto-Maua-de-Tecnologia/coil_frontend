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
                        name: string;
                        images: [string];
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
        const endpoint: string = import.meta.env.VITE_ENDPOINT as string;
        axios
            .get(
                `${endpoint}/get-all-activities?type_activity=${props.type_activity}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token as string
                    }
                }
            )
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
