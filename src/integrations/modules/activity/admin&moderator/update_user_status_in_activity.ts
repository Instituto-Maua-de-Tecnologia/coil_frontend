import axios, { AxiosError } from "axios";

interface UpdateUserStatusProps {
    body: {
        activity_id: string;
        applicant_id: string;
    };
}

interface UpdateUserStatusResponse {
    message: string;
    data: object;
}

export default async function updateUserStatusInActivity(
    props: UpdateUserStatusProps
) {
    const token = localStorage.getItem("token");
    console.log(JSON.stringify(props.body));
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .post(
                `${endpoint}/update-user-activity`,
                JSON.stringify(props.body),
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    }
                }
            )
            .then((response) => {
                const responseData: UpdateUserStatusResponse =
                    response.data as UpdateUserStatusResponse;
                resolve(responseData);
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<UpdateUserStatusResponse> =
                    error as AxiosError<UpdateUserStatusResponse>;
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
