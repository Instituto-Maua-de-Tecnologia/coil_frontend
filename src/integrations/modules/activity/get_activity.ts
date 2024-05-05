import axios, { AxiosError } from "axios";

interface GetActivityProps {
    token: string;
}

interface GetActivityResponse {
    message: "string";
    data: [
        {
            id: "string";
            title: "string";
            start_date: "string";
            end_date: "string";
            created_at: "string";
            updated_at: "string";
            courses: [
                {
                    course_id: number;
                    course: {
                        name: "string";
                    };
                }
            ];
            languages: [
                {
                    language: "string";
                }
            ];
            partner_institutions: [
                {
                    institution_id: "string";
                    institution: {
                        name: "string";
                        images: ["string"];
                    };
                }
            ];
            activity_status: {
                id: number;
                name: "string";
            };
            activity_type: {
                id: number;
                name: "string";
            };
        }
    ];
}

export default async function getActivity(props: GetActivityProps) {
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT as string;
        axios
            .get(`${endpoint}/get-activity`, {
                headers: {
                    Authorization: props.token
                }
            })
            .then((response) => {
                const responseData: GetActivityResponse =
                    response.data as GetActivityResponse;
                resolve(responseData.data);
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<GetActivityResponse> =
                    error as AxiosError<GetActivityResponse>;
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
