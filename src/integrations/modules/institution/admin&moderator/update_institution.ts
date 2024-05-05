import axios, { AxiosError } from "axios";

interface UpdateInstitutionProps {
    body: {
        name: string;
        description: string;
        email: string;
        country: string;
        images: [string];
        social_medias: [
            {
                media?: string;
                link?: string;
            }
        ];
    };
}

interface UpdateInstitutionResponse {
    message: string;
}

export default async function createModerator(props: UpdateInstitutionProps) {
    const token = localStorage.getItem("token");
    console.log(JSON.stringify(props.body));
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .post(
                `${endpoint}/create-institution`,
                JSON.stringify(props.body),
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    }
                }
            )
            .then((response) => {
                const responseData: UpdateInstitutionResponse =
                    response.data as UpdateInstitutionResponse;
                resolve(responseData);
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<UpdateInstitutionResponse> =
                    error as AxiosError<UpdateInstitutionResponse>;
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
