import axios, { AxiosError } from "axios";

interface GetInstitutionProps {
    institution_id: string;
}

interface GetInstitutionResponse {
    message: string;
    data: {
        id: string;
        name: string;
        email: string;
        countries: [
            {
                id?: number;
                country?: {
                    id: number;
                    country: string;
                    country_code: string;
                };
            }
        ];
        images: string[];
        social_medias: [
            {
                id?: number;
                media?: {
                    id: number;
                    social_media: string;
                };
                link?: string;
            }
        ];
    };
}

export default async function getInstitution(props: GetInstitutionProps) {
    const token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .get(
                `${endpoint}/get-institution?institution_id=${props.institution_id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token as string
                    }
                }
            )
            .then((response) => {
                const responseData: GetInstitutionResponse =
                    response.data as GetInstitutionResponse;
                resolve(responseData.data); // already has a default return
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<GetInstitutionResponse> =
                    error as AxiosError<GetInstitutionResponse>;
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
