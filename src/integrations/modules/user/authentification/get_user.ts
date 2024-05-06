import axios, { AxiosError } from "axios";

interface GetUserProps {
    token: string;
}

interface GetUserResponse {
    message: string;
    data: {
        id: string;
        name: string;
        email: string;
        user_type: string;
        course: string | null;
        semester_course: number | null;
        created_at: string;
        updated_at: string;
    };
}

export default async function getUser(props: GetUserProps) {
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .get(`${endpoint}/get-user`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: props.token
                } //requisição do repositório e não da entidade
            })
            .then((response) => {
                const responseData: GetUserResponse =
                    response.data as GetUserResponse;
                resolve(responseData.data); // already has a default return
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<GetUserResponse> =
                    error as AxiosError<GetUserResponse>;
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
