import axios, { AxiosError } from "axios";

interface AssignUserToActivityProps {
    activity_id: string;
}

interface AssignUserToActivityResponse {
    message: string;
}

export default async function assignUserToActivities(
    props: AssignUserToActivityProps
) {
    const token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT as string;
        axios
            .get(`${endpoint}/assign-user?activity_id=${props.activity_id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token as string
                }
            })
            .then((response) => {
                const responseData: AssignUserToActivityResponse =
                    response.data as AssignUserToActivityResponse;
                resolve(responseData);
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<AssignUserToActivityResponse> =
                    error as AxiosError<AssignUserToActivityResponse>;
                const errorResponse = convertedError.response;
                if (errorResponse) {
                    reject({
                        status: errorResponse.status,
                        message: errorResponse.data
                    });
                }
            });
    });
}
