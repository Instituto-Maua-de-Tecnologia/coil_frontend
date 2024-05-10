import axios, { AxiosError } from "axios";

interface GetAllActivitiesProps {
    activity_id: string;
}

interface GetAllActivitiesResponse {
    message: string;
    data: {
        id: string;
        title: string;
        start_date: string;
        end_date: string;
        description: string;
        languages: string[];
        courses: [
            {
                id: number;
                name: string;
            }
        ];
        partner_institutions: [
            {
                id: string;
                institution: {
                    id: string;
                    name: string;
                    description: string;
                    email: string;
                    country: string;
                    images: string[];
                    social_medias: string[];
                };
            }
        ];
        criterias: [
            {
                id: number;
                criteria: string;
            }
        ];
        status_activity: number;
        type_activity: number;
        created_at: string;
        updated_at: string;
        applicants: [
            {
                id: string;
                status: boolean;
                user: {
                    id: string;
                    name: string;
                    email: string;
                    user_type: number;
                    course: null;
                    semester_course: number;
                    created_at: string;
                    updated_at: string;
                };
            }
        ];
    };
}

export default async function getActivity(props: GetAllActivitiesProps) {
    const token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL as string;
        axios
            .get(`${endpoint}/get-activity?activity_id=${props.activity_id}`, {
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
                        message: errorResponse.data
                    });
                }
            });
    });
}
