import axios, { AxiosError } from "axios";

interface GetAllCoursesResponse {
    message: string;
    data: {
        id: string;
        name: string;
    };
}

export default async function getAllCourses() {
    const token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .get(`${endpoint}/get-all-courses`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token as string
                }
            })
            .then((response) => {
                const responseData: GetAllCoursesResponse =
                    response.data as GetAllCoursesResponse;
                resolve(responseData.data); // already has a default return
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError<GetAllCoursesResponse> =
                    error as AxiosError<GetAllCoursesResponse>;
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
