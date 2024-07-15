import axios, { AxiosError, AxiosResponse } from "axios";

interface AuthUserProps {
    token: string;
}

interface AuthUserResponse {
    message: string;
    data: {
        token: string;
    };
}

export default async function authUser(props: AuthUserProps) {
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .get(`${endpoint}/auth-user`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: props.token
                }
            })
            .then((response: AxiosResponse) => {
                // only gets 2xx status code
                const responseData: AuthUserResponse =
                    response.data as AuthUserResponse;
                resolve(responseData.data.token);
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<AuthUserResponse> =
                    error as AxiosError<AuthUserResponse>;
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
