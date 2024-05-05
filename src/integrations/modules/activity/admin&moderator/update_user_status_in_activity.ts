import axios, { AxiosError } from "axios";

interface UpdateActivityProps {
    body: {
        activity_id: string;
        title: string;
        description: string;
        start_date: string;
        end_date: string;
        languages: [string];
        partner_institutions: [string];
        course: [
            {
                id?: number;
                name?: string;
            }
        ];
        criterias: [string];
        type_activity: number;
    };
}

interface UpdateActivityResponse {
    message: string;
}

export default async function updateActivity(props: UpdateActivityProps) {
    const token = localStorage.getItem("token");
    console.log(JSON.stringify(props.body));
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .post(`${endpoint}/update-activity`, JSON.stringify(props.body), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            })
            .then((response) => {
                const responseData: UpdateActivityResponse =
                    response.data as UpdateActivityResponse;
                resolve(responseData);
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<UpdateActivityResponse> =
                    error as AxiosError<UpdateActivityResponse>;
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
