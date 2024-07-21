import axios, { AxiosError } from "axios";
import ICatalog from "@interfaces/catalog/ICatalog.ts";

interface GetCatalogResponse {
    message: string;
    data: ICatalog;
}

export default async function getCatalog() {
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .get(`${endpoint}/get-catalog`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                const responseData: GetCatalogResponse =
                    response.data as GetCatalogResponse;
                resolve(responseData.data);
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<GetCatalogResponse> =
                    error as AxiosError<GetCatalogResponse>;
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
