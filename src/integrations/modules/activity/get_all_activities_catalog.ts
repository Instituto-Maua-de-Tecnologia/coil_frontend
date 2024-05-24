import axios, { AxiosError } from "axios";

interface GetAllActivityCatalogResponse {
    message: string;
    data: any;
}

export default async function getAllActivitiesCatalog() {
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .get(`${endpoint}/get-all-activities-catalog`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                const responseData: GetAllActivityCatalogResponse =
                    response.data as GetAllActivityCatalogResponse;
                resolve(responseData.data);
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<GetAllActivityCatalogResponse> =
                    error as AxiosError<GetAllActivityCatalogResponse>;
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
