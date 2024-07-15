import axios, { AxiosError } from "axios";

interface CreateActivityProps {
    body: {
        title: string;
        description: string;
        start_date: string;
        end_date: string;
        languages: number[];
        partner_institutions: string[];
        courses: number[];
        criterias: {
            id?: number;
            criteria?: string;
        }[];
        type_activity: number;
    };
}

interface CreateActivityResponse {
    message: string;
}

export default async function createActivity(props: CreateActivityProps) {
    const token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .post(`${endpoint}/create-activity`, JSON.stringify(props.body), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            })
            .then((response) => {
                const responseData: CreateActivityResponse =
                    response.data as CreateActivityResponse;
                resolve(responseData);
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<CreateActivityResponse> =
                    error as AxiosError<CreateActivityResponse>;
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
