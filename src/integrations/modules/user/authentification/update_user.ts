import axios, { AxiosError } from "axios";

interface UpdateUserProps {
    headers: {
        Authorization: string;
    };
    body: {
        course: string;
        semester_courser: number;
    };
}

interface UpdateUserResponse {
    message: string;
    data: {
        id: string;
        name: string;
        email: string;
        user_type: number;
        course: {
            id: number;
            name: string;
        };
        semester_course: number;
        created_at: string;
        updated_at: string;
    };
}

export default async function updateUser(props: UpdateUserProps) {
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT as string;
        axios
            .post(`${endpoint}/update-user`, props)
            .then((response) => {
                const responseData: UpdateUserResponse =
                    response.data as UpdateUserResponse;
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
