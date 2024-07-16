import axios, { AxiosError } from "axios";

interface GetInstitutionsRequirementsResponse {
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

export default async function getInstitutionsRequirements() {
    const token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .get(`${endpoint}/get-institution-requirements`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token as string
                }
            })
            .then((response) => {
                const responseData: GetInstitutionsRequirementsResponse =
                    response.data as GetInstitutionsRequirementsResponse;
                resolve(responseData.data);
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<GetInstitutionsRequirementsResponse> =
                    error as AxiosError<GetInstitutionsRequirementsResponse>;
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
