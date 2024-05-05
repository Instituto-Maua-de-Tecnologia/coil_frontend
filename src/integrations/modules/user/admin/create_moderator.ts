import axios, { AxiosError } from "axios";
import getUser from "@integrations/user/authentification/get_user.ts";

interface CreateModeratorProps {
    body: {
        email: string;
    };
}

interface CreateModeratorResponse {
    message: string;
    data: {
        email: string;
    };
}

export default async function createModerator(props: CreateModeratorProps) {
    const token = localStorage.getItem("token");
    console.log(JSON.stringify(props.body));
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .post(`${endpoint}/create-moderator`, JSON.stringify(props.body), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            })
            .then(async (response) => {
                const responseData: CreateModeratorResponse =
                    response.data as CreateModeratorResponse;
                const user = await getUser({ token: token as string });
                localStorage.setItem("user", JSON.stringify(user));
                resolve(responseData.data);
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<CreateModeratorResponse> =
                    error as AxiosError<CreateModeratorResponse>;
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
