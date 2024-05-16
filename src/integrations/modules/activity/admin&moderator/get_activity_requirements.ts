import axios, { AxiosError } from "axios";

interface GetActivityRequirements {
    message: string;
    data: {
        courses: [
            {
                id: number;
                course: string;
            }
        ];
        criterias: [
            {
                id: number;
                criteria: string;
            }
        ];
        languages: [
            {
                id: number;
                language: string;
                language_code: string;
            }
        ];
        institutions: [
            {
                id?: string;
                name?: string;
            }
        ];
    };
}

export default async function getActivity() {
    const token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .get(`${endpoint}/get-activity-requirements`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token as string
                }
            })
            .then((response) => {
                const responseData: GetActivityRequirements =
                    response.data as GetActivityRequirements;
                resolve(responseData);
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<GetActivityRequirements> =
                    error as AxiosError<GetActivityRequirements>;
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
