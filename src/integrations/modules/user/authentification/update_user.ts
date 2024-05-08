import axios, { AxiosError } from "axios";

interface UpdateUserProps {
    body: {
        course: string;
        semester_course: number;
    };
}

interface UpdateUserResponse {
    message: string;
    data: {
        id: string;
        name: string;
        email: string;
        user_type: number;
        course: string;
        semester_course: number;
        created_at: string;
        updated_at: string;
    };
}

export default async function updateUser(props: UpdateUserProps) {
    const token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .post(`${endpoint}/update-user`, JSON.stringify(props.body), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            })
            .then((response) => {
                const responseData: UpdateUserResponse =
                    response.data as UpdateUserResponse;
                const user = JSON.stringify(responseData.data);
                localStorage.setItem("user", user);
                resolve(responseData.data);
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<UpdateUserResponse> =
                    error as AxiosError<UpdateUserResponse>;
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
