import axios, { AxiosError } from "axios";

interface AssignUserToActivityProps {
    type_activity: string;
}

interface AssignUserToActivityResponse {}

export default async function getAllActivities(
    props: AssignUserToActivityProps
) {
    const token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT as string;
        axios
            .get(
                `${endpoint}/get-all-activities?type_activity=${props.type_activity}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token as string
                    }
                }
            )
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
