import TitleHeader from "@components/GenericComponents/TitleHeader";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import updateUser from "@integrations/user/authentification/update_user.ts";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import ToasterContainer from "@components/GenericComponents/ToasterContainer";

export default function SignUp() {
    /* eslint-disable */
    const [selectedCourseOption, setSelectedCourseOption] =
        useState<string>("");
    const [selectedSemesterOption, setSelectedSemesterOption] =
        useState<number>(0);

    const navigate = useNavigate();
    function handleCourseOption(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedCourseOption(event.target.value);
    }
    function handleSemesterOption(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedSemester = parseInt(event.target.value, 10); // Convertendo para número inteiro
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
        await toast
            .promise(handlePostCS(), {
                loading: "Realizando Cadastro...",
                success: <b>Usuário cadastrado com sucesso</b>,
                error: (error) => error.message
            })
            .then(async () => {
                await delay(3000);
                handleNavigate();
            });
    }

    function handleNavigate() {
        navigate("/Home");
    }

    const courseValues: string[] = [
        "Administração",
        "Arquitetura e Urbanismo",
        "Ciência da Computação",
        "Design",
        "Engenharia Civil",
        "Engenharia de Alimentos",
        "Engenharia de Computação",
        "Engenharia de Controle e Automação",
        "Engenharia de Produção",
        "Engenharia Elétrica",
        "Engenharia Eletrônica",
        "Engenharia Mecânica",
        "Engenharia Química",
        "Inteligência Artificial e Ciência de Dados",
        "Relações Internacionais",
        "Sistemas de Informação"
    ];

    const semesterValues: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
                        <select
                            className={`ms-2 text-wrap break-words overflow-ellipsis rounded-xl p-1 ${isDarkTheme ? "bg-[#0F1820]" : "bg-white"}`}
                            value={selectedCourseOption}
                            onChange={handleCourseOption}
                        >
                            {courseValues.map((course, index) => (
                                <option
                                    key={"courseOption " + index}
                                    className={
                                        "text-wrap break-words overflow-ellipsis"
                                    }
                                    value={course}
                                >
                                    {course}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={"flex justify-center mt-10"}>
                        <h1>Selecione seu semestre: </h1>
                        <select
                            className={`ms-2 w-[280px] rounded-xl p-1 ${isDarkTheme ? "bg-[#0F1820]" : "bg-white"}`}
                            value={selectedSemesterOption}
                            onChange={handleSemesterOption}
                        >
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
