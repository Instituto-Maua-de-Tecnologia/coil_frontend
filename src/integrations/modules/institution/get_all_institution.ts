import axios, { AxiosError } from "axios";

interface GetAllInstitutionResponse {
    message: string;
    data: {
        id?: string;
        name?: string;
        logo?: string;
    };
}

export default async function getAllInstitutions() {
    const token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .get(`${endpoint}/get-all-institutions/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token as string
                }
            })
            .then((response) => {
                const responseData: GetAllInstitutionResponse =
                    response.data as GetAllInstitutionResponse;
                resolve(responseData.data); // already has a default return
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<GetAllInstitutionResponse> =
                    error as AxiosError<GetAllInstitutionResponse>;
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
