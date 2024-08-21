import axios, { AxiosError } from "axios";

interface CreateInstitutionProps {
    name: string;
    description: string;
    email: string;
    countries: number[];
    images: string[];
    social_medias: [
        {
            id: number;
            link: string;
        }
    ];
}

interface CreateInstitutionResponse {
    message: string;
}

export default async function createInstitution(props: CreateInstitutionProps) {
    const token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .post(`${endpoint}/create-institution`, JSON.stringify(props), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            })
            .then((response) => {
                const responseData: CreateInstitutionResponse =
                    response.data as CreateInstitutionResponse;
                resolve(responseData);
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<CreateInstitutionResponse> =
                    error as AxiosError<CreateInstitutionResponse>;
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
