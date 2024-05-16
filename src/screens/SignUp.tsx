import TitleHeader from "@components/GenericComponents/TitleHeader";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import ToasterContainer from "@components/GenericComponents/ToasterContainer";
import { MoonLoader } from "react-spinners";

export type CourseProps = [
    {
        id: number;
        name: string;
    }
];

export default function SignUp() {
    /* eslint-disable */
    const [selectedCourseOption, setSelectedCourseOption] =
        useState<string>("");
    const [selectedSemesterOption, setSelectedSemesterOption] =
        useState<number>(0);
    const [courses, setCourses] = useState<CourseProps>([{ id: 0, name: "" }]);
    const [loaded, setLoaded] = useState<boolean>(false);

    const navigate = useNavigate();
    function handleCourseOption(event: any) {
        setSelectedCourseOption(event.target.value);
    }
    function handleSemesterOption(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedSemester = parseInt(event.target.value, 10);
        setSelectedSemesterOption(selectedSemester);
    }

    async function delay(ms: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "");
        if (user.course != null && user.semester_course != 0) navigate("/Home");
    });

    async function handlePostCS() {
        if (selectedSemesterOption && selectedCourseOption) {
            await updateUser({
                body: {
                    course: selectedCourseOption,
                    semester_course: selectedSemesterOption
                }
            })
                .then(() => {
                    navigate("/Home");
                })
                .catch((error) => {
                    if (error.status === 401) {
                        localStorage.clear();
                        throw new Error("Usuário não Autorizado.");
                    } else if (error.status === 403)
                        throw new Error("E-mail deve ser do domínio maua.br!");
                    else if (error.message === "MissingToken")
                        throw new Error(
                            "Erro ao localizar o token de acesso. Por favor, tente novamente."
                        );
                    else
                        throw new Error(
                            "Falha ao realizar cadastro. Por favor, tente mais tarde."
                        );
                });
        } else alert("Dados inválidos");
    }

    async function handlePost() {
        if (selectedCourseOption != "" && selectedSemesterOption != null) {
            await toast
                .promise(handlePostCS(), {
                    loading: "Realizando Cadastro...",
                    success: <b>Usuário cadastrado com sucesso</b>,
                    error: (error) => error.message
                })
                .then(async () => {
                    await delay(3000);
                    navigate("/Home"); //TODO: navigate runs before toast be completed
                });
        } else alert("Preencha corretamente os dados");
    }

    const handleGetAllCourses = async () => {
        try {
            const courseValues = (await getAllCourses()) as CourseProps;
            setCourses(courseValues);
            setLoaded(true);
        } catch (error) {
            console.error("Erro ao obter cursos:", error);
        }
    };

    useEffect(() => {
        handleGetAllCourses();
    }, []);

    const semesterValues: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // TODO: validation on semester based in which course the user selected

    const isDarkTheme = useThemeDetector();

    return (
        <>
            <ToasterContainer />
            <TitleHeader title={"Sign Up"}></TitleHeader>
            <div className="flex-grow h-screen mx-3 overflow-hidden flex flex-row">
                <div
                    className={`w-full text-black text-center p-20 max-h-[75%] ${isDarkTheme ? "bg-[#14222E] text-white" : "bg-sb-bg text-black"}  rounded-3xl`}
                >
                    <div className={"flex justify-center"}>
                        <h1>Selecione seu curso: </h1>
                        {loaded ? (
                            <select
                                className={`ms-2 text-wrap break-words overflow-ellipsis rounded-xl p-1 ${isDarkTheme ? "bg-[#0F1820]" : "bg-white"}`}
                                value={selectedCourseOption}
                                onChange={handleCourseOption}
                            >
                                <option value="" disabled hidden>
                                    Selecione seu curso...
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
                        ) : (
                            <div className="flex justify-center items-center mt-[25vh]">
                                <MoonLoader color="#FFFFFF" size={35} />
                            </div>
                        )}
                    </div>
                    <div className={"flex justify-center mt-10"}>
                        <h1>Selecione seu semestre: </h1>
                        <select
                            className={`ms-2 w-[280px] rounded-xl p-1 ${isDarkTheme ? "bg-[#0F1820]" : "bg-white"}`}
                            value={selectedSemesterOption}
                            onChange={handleSemesterOption}
                        >
                            <option value="" disabled hidden>
                                Selecione seu semestre...
                            </option>
                            {semesterValues.map((semester, index) => (
                                <option
                                    key={"semesterOption " + index}
                                    value={semester}
                                >
                                    {semester}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={"w-full mt-10"}>
                        <button
                            className={
                                "bg-blue-600 rounded-full p-2 items-center"
                            }
                            onClick={handlePost}
                        >
                            Enviar dados
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
