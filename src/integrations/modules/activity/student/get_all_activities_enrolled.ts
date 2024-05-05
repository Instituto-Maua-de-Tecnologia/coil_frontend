import axios, { AxiosError } from "axios";

interface GetAllActivitiesResponse {
    message: string;
}

export default async function getAllActivitiesEnrolled() {
    const token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .get(`${endpoint}/get-all-activities-enrolled`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token as string
                }
            })
            .then((response) => {
                const responseData: GetAllActivitiesResponse =
                    response.data as GetAllActivitiesResponse;
                resolve(responseData);
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<GetAllActivitiesResponse> =
                    error as AxiosError<GetAllActivitiesResponse>;
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
