import axios, { AxiosError } from "axios";

interface GetAllModeratorsResponse {
    message: string;
    data: {
        id?: string;
        name?: string;
        email?: string;
        user_type?: number;
        created_at?: string;
        updated_at?: string;
    };
}

export default async function getAllModerators() {
    const token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .get(`${endpoint}/get-all-moderators/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token as string
                }
            })
            .then((response) => {
                const responseData: GetAllModeratorsResponse =
                    response.data as GetAllModeratorsResponse;
                resolve(responseData.data);
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<GetAllModeratorsResponse> =
                    error as AxiosError<GetAllModeratorsResponse>;
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
