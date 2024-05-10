import account_circle from "@assets/icons/account_circle.png";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import updateUser from "@integrations/user/authentification/update_user";
import React, { useEffect, useState } from "react";
import { CourseProps } from "@screens/SignUp";
import getAllCourses from "@integrations/course/get_all_courses";
import ToasterContainer from "@components/GenericComponents/ToasterContainer.tsx";
import toast from "react-hot-toast";

export type UserCardProps = {
    userCard: {
        id: string;
        name: string;
        email: string;
        user_type: number;
        course: string;
        semester_course: number;
        created_at: string;
        updated_at: string;
    };
};

export default function UserCard({ userCard }: UserCardProps) {
    const { name, course, email, semester_course } = userCard;
    const [updatedCourseOption, setUpdatedCourseOption] =
        useState<string>(course);
    const [updatedSemesterOption, setUpdatedSemesterOption] =
        useState<number>(semester_course);
    const [courses, setCourses] = useState<CourseProps>([{ id: 0, name: "" }]);
    const [updatable, setUpdatable] = useState(false);
    const [showArrow, setShowArrow] = useState<{ [key: string]: string }>({
        WebkitAppearance: "none"
    });
    const [aqMudou, setAqMudou] = useState<boolean>(false);

    const semesters: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const handleGetAllCourses = async () => {
        try {
            const courseValues = (await getAllCourses()) as CourseProps;
            setCourses(courseValues);
        } catch (error) {
            console.error("Erro ao obter cursos:", error);
        }
    };

    const toggleUpdatable = () => {
        setUpdatable(!updatable);
        if (updatable) {
            setUpdatedCourseOption(course);
            setUpdatedSemesterOption(semester_course);
        }
        const showArrow = updatable
            ? { WebkitAppearance: "none" }
            : { WebkitAppearance: "auto" };
        setShowArrow(showArrow);
    };

    function handleCourseOption(event: any) {
        setUpdatedCourseOption(event.target.value);
    }

    function handleSemesterOption(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedSemester = parseInt(event.target.value, 10);
        setUpdatedSemesterOption(selectedSemester);
    }

    async function handleProfileUpdates() {
        toggleUpdatable();
        if (
            updatedCourseOption != course ||
            updatedSemesterOption != semester_course
        ) {
            console.log(updatedCourseOption);
            await toast
                .promise(
                    updateUser({
                        body: {
                            course: updatedCourseOption,
                            semester_course: updatedSemesterOption
                        }
                    }),
                    {
                        loading: "Mudando seus dados...",
                        success: <b>Seus dados foram atualizados</b>,
                        error: (error) => error.message
                    }
                )
                .then(() => {
                    setAqMudou(true);
                })
                .catch((error) => {
                    console.log(error);
                    if (error.message === "MissingToken")
                        throw new Error(
                            "Erro ao localizar o token de acesso. Por favor, tente novamente."
                        );
                    else throw new Error("Falha ao atualizar dados");
                });
        }
    }

    useEffect(() => {
        handleGetAllCourses();
        setUpdatedCourseOption(course);
        setUpdatedSemesterOption(semester_course);
    }, []);

    useEffect(() => {
        setUpdatedCourseOption(
            JSON.parse(localStorage.getItem("user") as string).course
        );
        setUpdatedSemesterOption(
            JSON.parse(localStorage.getItem("user") as string).semester_course
        );
    }, [aqMudou]);

    const isDarkTheme = useThemeDetector();

    return (
        <>
            <ToasterContainer />
            <div className="flex rounded-3xl  mb-4 ">
                <div className="flex wrap  items-center w-full min-h-20 ">
                    <div className="sm:flex xsm:flex-wrap w-full max-h-full lg:mt-20">
                        <div className="w-full">
                            <img
                                src={account_circle}
                                alt="Avatar"
                                className="avatar-img mx-auto sm:-mx-auto w-[23vw] rounded-full "
                            />
                        </div>
                        <div className="flex-col w-full h-full items-center mt-10 ">
                            <p
                                className={`${isDarkTheme ? "bg-[#223A4F]" : "bg-slate-100"} rounded-3xl p-4 mb-5`}
                            >
                                {name}
                            </p>
                            <div className="flex items-center mb-5">
                                <p
                                    className={`w-1/2 ${isDarkTheme ? "bg-[#223A4F]" : "bg-slate-100"} rounded-3xl p-4 me-5`}
                                >
                                    {email.substring(0, email.indexOf("@"))}
                                </p>
                                <p
                                    className={`w-1/2 ${isDarkTheme ? "bg-[#223A4F]" : "bg-slate-100"} rounded-3xl p-4`}
                                >
                                    Institute Maua Of Technology
                                </p>
                            </div>
                            <div className="flex mb-5">
                                <select
                                    className={`w-1/2 ${updatable ? "cursor-pointer" : "cursor-not-allowed"} ${isDarkTheme ? "bg-[#223A4F]" : "bg-slate-100"} rounded-3xl p-4 me-5`}
                                    value={updatedCourseOption}
                                    onChange={handleCourseOption}
                                    disabled={!updatable}
                                    style={showArrow}
                                >
                                    <option value={updatedCourseOption} hidden>
                                        {updatedCourseOption}
                                    </option>
                                    {Array.from({ length: courses.length }).map(
                                        (_, index) => (
                                            <option
                                                key={"courseOption " + index}
                                                value={courses[index].name}
                                            >
                                                {courses[index].name}
                                            </option>
                                        )
                                    )}
                                </select>
                                <select
                                    className={`w-1/2 ${updatable ? "cursor-pointer" : "cursor-not-allowed"} ${isDarkTheme ? "bg-[#223A4F]" : "bg-slate-100"} rounded-3xl p-4 me-5 ellipsis`}
                                    value={updatedSemesterOption}
                                    onChange={handleSemesterOption}
                                    disabled={!updatable}
                                    style={showArrow}
                                >
                                    <option
                                        value={updatedSemesterOption}
                                        hidden
                                    >
                                        {updatedSemesterOption}
                                    </option>
                                    {semesters.map((_, index) => (
                                        <option
                                            key={"courseOption " + index}
                                            value={semesters[index]}
                                        >
                                            {semesters[index]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <p
                                className={`w-full ${isDarkTheme ? "bg-[#223A4F]" : "bg-slate-100"} rounded-3xl p-4 mb-5`}
                            >
                                {email}
                            </p>
                            <button
                                onClick={toggleUpdatable}
                                className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full"
                            >
                                {!updatable ? "Update" : "Cancel"}
                            </button>
                            {updatable ? (
                                <button
                                    onClick={handleProfileUpdates}
                                    className="bg-blue-500 text-white ml-2 text-sm px-4 py-2 rounded-full"
                                >
                                    Save Changes
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
