import Select, { StylesConfig } from "react-select";
import TrashButton from "./TrashButton.tsx";
import DropdownIndicator from "../GenericComponents/DropdownIndicator.tsx";
import { useEffect, useRef, useState } from "react";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import toast from "react-hot-toast";
import getAllCourses from "@integrations/course/get_all_courses.ts";
import createActivity from "@integrations/activity/admin&moderator/create_activity.ts";
import { useNavigate } from "react-router-dom";
import { CourseProps } from "@screens/SignUp.tsx";
import getAllInstitutions from "@integrations/institution/get_all_institution.ts";
import ToasterContainer from "@components/GenericComponents/ToasterContainer.tsx";

type InstitutionProps = [
    {
        id: number;
        name: string;
        logo: string;
    }
];

interface ActivityFromData {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    languages: string[];
    partner_institutions: string[];
    courses: [
        {
            id: number;
            name: string;
        }
    ];
    criterias: string[];
    type_activity: number;
}

const langOptions = [
    { value: "portuguese", label: "Portuguese" },
    { value: "english", label: "English" },
    { value: "dutch", label: "Dutch" }
];

interface ActivityFormProps {
    isProject: boolean;
}

const CreateActivityForm = ({ isProject }: ActivityFormProps) => {
    const [courses, setCourses] = useState<CourseProps>([{ id: 0, name: "" }]);
    const [selectedCourses, setSelectedCourses] = useState<CourseProps>([
        { id: 0, name: "" }
    ]);
    const [institutions, setInstitutions] = useState<InstitutionProps>([
        { id: 0, name: "", logo: "" }
    ]); //TODO: verificar se a lógica está certa ou se ele está puxando todas as instituições, ele tem que puxar só as instituições selecionadas pelo usuário
    const [selectedLanguages, setSelectedlanguages] = useState<string[]>([]);

    const [formData, setFormData] = useState<ActivityFromData>({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        languages: [""],
        partner_institutions: [""],
        courses: [
            {
                id: 0,
                name: ""
            }
        ],
        criterias: [""],
        type_activity: isProject ? 1 : 2
    });
    const projectNameRef = useRef<HTMLInputElement>(null);
    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);
    const projectDescriptionRef = useRef<HTMLTextAreaElement>(null);

    const navigate = useNavigate();
    const isDarkTheme = useThemeDetector();

    const inputStyle = {
        backgroundColor: isDarkTheme ? "#223A4F" : "#F0F3FB",
        placeholderColor: isDarkTheme ? "#0F1820" : "CBD0DD",
        border: "none",
        borderRadius: "30px",
        padding: "9px 12px",
        outline: "none"
    };

    const textAreaStyle = {
        backgroundColor: isDarkTheme ? "#223A4F" : "#F0F3FB",
        border: "none",
        borderRadius: "18px",
        padding: "8px 12px",
        outline: "none"
    };

    const multiStyle: StylesConfig = {
        control: (provided) => ({
            ...provided,
            backgroundColor: isDarkTheme ? "#223A4F" : "#F0F3FB",
            border: "none",
            boxShadow: "none",
            borderRadius: "30px"
        }),
        menu: () => ({
            backgroundColor: isDarkTheme ? "#223A4F" : "#F0F3FB",
            padding: "8px",
            borderRadius: "30px",
            boxShadow: "0 0 2px #1D232C50"
        }),
        option: (provided, state) => ({
            ...provided,
            margin: "0 0 8px 0",
            width: "80%",
            color: "#FFFFFF",
            borderRadius: "30px",
            backgroundColor: state.isFocused ? "#673366" : "#512650",
            whiteSpace: "nowrap",
            cursor: "pointer",
            overflow: "hidden",
            textOverflow: "ellipsis"
        }),
        multiValue: (provided) => ({
            ...provided,
            color: "#FFFFFF",
            padding: "1px 4px",
            borderRadius: "30px",
            backgroundColor: "#673366",
            maxWidth: "240px",
            fontSize: "20px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: "#FFFFFF"
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: "#FFFFFF",
            ":hover": {
                backgroundColor: "transparent"
            }
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: isDarkTheme ? "#FFFFFF" : "#1D232C"
        }),
        placeholder: (provided) => ({
            ...provided,
            color: isDarkTheme ? "#CBD0DD" : "#0F1820"
        })
    };

    const singleStyle: StylesConfig = {
        control: (provided) => ({
            ...provided,
            backgroundColor: isDarkTheme ? "#223A4F" : "#F0F3FB",
            border: "none",
            boxShadow: "none",
            borderRadius: "30px"
        }),
        menu: () => ({
            backgroundColor: isDarkTheme ? "#223A4F" : "#F0F3FB",
            padding: "8px",
            borderRadius: "30px",
            boxShadow: "0 0 2px #1D232C50"
        }),
        option: (provided, state) => ({
            ...provided,
            margin: "0px 0px 8px 0px",
            width: "100%",
            color: isDarkTheme ? "#FFFFFF" : "#1D232C",
            whiteSpace: "nowrap",
            overflow: "hidden",
            borderRadius: "30px",
            textOverflow: "ellipsis",
            cursor: "pointer",
            background: state.isFocused
                ? "rgba(112,155,210,0.49)"
                : "transparent"
        }),
        singleValue: (provided) => ({
            ...provided,
            color: isDarkTheme ? "#FFFFFF" : "#1D232C",
            width: "100%",
            background: "transparent",
            padding: "4px 12px",
            borderRadius: "30px"
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            fill: "#FFFFFF"
        }),
        placeholder: (provided) => ({
            ...provided,
            color: isDarkTheme ? "#CBD0DD" : "#0F1820"
        })
    };

    const [criterias, setCriterias] = useState<string[]>([""]);

    const handleAddCriteria = () => {
        setCriterias([...criterias, ""]);
    };

    const handleRemoveCriteria = (index: number) => {
        const newCriterias = [...criterias];
        newCriterias.splice(index, 1);
        setCriterias(newCriterias);
    };

    async function delay(ms: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    const handleGetAllCoursesAndInstitutions = async () => {
        try {
            const institutionValues =
                (await getAllInstitutions()) as InstitutionProps;
            setInstitutions(institutionValues);
            const courseValues = (await getAllCourses()) as CourseProps;
            setCourses(courseValues);
        } catch (error) {
            console.error("Erro ao obter cursos:", error);
        }
    };
    //TODO: fazer verificação do: titulo(não pode ser repetido(dar um get para saber quais titulos estão em uso), não pode ser maior que 255 e menor que 3 caracteres), descrição(pode ir até ), imagens(base64), data(só pode ter número, data de ínicio tem que ser menor que a de fim, mandar informações usando dateTime() formato dd/mm/yy)

    useEffect(() => {
        handleGetAllCoursesAndInstitutions();
    }, []);

    async function handlePostActivity() {
        const startDatePart = startDateRef.current?.value.split("/");
        const endDatePart = endDateRef.current?.value.split("/");
        let day;
        let month;
        let year;
        if (startDatePart) {
            day = parseInt(startDatePart[0], 10);
            month = parseInt(startDatePart[1], 10) - 1;
            year = parseInt(startDatePart[2], 10);
        }
        const start_date = new Date(
            year as number,
            month as number,
            day as number
        ).toISOString();
        if (endDatePart) {
            day = parseInt(endDatePart[0], 10);
            month = parseInt(endDatePart[1], 10) - 1;
            year = parseInt(endDatePart[2], 10);
        }
        const end_date = new Date(
            year as number,
            month as number,
            day as number
        ).toISOString();

        const partner_institutions: string[] = institutions.map((institution) =>
            institution.id.toString()
        );
        const title = projectNameRef.current?.value || "";
        const description = projectDescriptionRef.current?.value || "";
        const courses = selectedCourses;
        const languages = selectedLanguages.map((fds) => fds);

        const newFormData: ActivityFromData = {
            ...formData,
            title,
            start_date,
            end_date,
            description,
            partner_institutions,
            courses,
            criterias,
            languages
        };
        console.log(newFormData);

        setFormData(newFormData);
        await createActivity({
            body: newFormData
        })
            .then()
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
                else if (
                    error.status === 422 &&
                    error.message === "Activity with this title already exists"
                ) {
                    throw new Error("Título já em uso");
                } else
                    throw new Error(
                        `Falha ao criar ${isProject ? "Projeto" : "Mobilidade Acadêmica"}. Por favor, tente mais tarde.`
                    );
            });
    }

    async function handlePost() {
        await toast
            .promise(handlePostActivity(), {
                loading: `Criando ${isProject ? "Projeto" : "Mobilidade Acadêmica"}...`,
                success: (
                    <b>
                        {isProject
                            ? "Projeto criado "
                            : "Mobilidade Acadêmica criada "}{" "}
                        com sucesso
                    </b>
                ),
                error: (error) => error.message
            })
            .then(async () => {
                await delay(5000);
                //TODO: navigate runs before toast be completed
            })
            .then(() => navigate("/Home")); // TODO: validação de campos vazios no if/else
    }

    const courseOptions = courses.map((course) => ({
        value: course.id,
        label: course.name
    }));

    const institutionsOptions = institutions.map((institution) => ({
        value: institution.id,
        label: institution.name
    }));

    const handleSelectCourse = (selectedOptions: any) => {
        const courses = selectedOptions.map((option: any) => ({
            id: option.value,
            name: option.label
        }));
        setFormData({ ...formData, courses: courses });
        setSelectedCourses(courses);
    };

    const handleSelectLanguages = (selectedOptions: any) => {
        const languages = selectedOptions.map((option: any) => option.value);
        setFormData({ ...formData, languages: languages });
        setSelectedlanguages(languages);
    };

    return (
        <>
            <ToasterContainer />
            <div
                className={`w-full md:ml-4 px-4 py-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl overflow-auto`}
            >
                <div className="form [font-family:'Inter',Helvetica] font-semibold space-y-2">
                    <div className="form-row-1 flex flex-col mx-2 max-w-[49%] min-w-[420px] space-y-2">
                        <label htmlFor="projectName">Project Name</label>
                        <input
                            ref={projectNameRef}
                            className={`placeholder:text-[${inputStyle["placeholderColor"]}]`}
                            type="text"
                            placeholder="Type the name..."
                            style={inputStyle}
                        />
                    </div>
                    <div className="form-row-2 md:flex min-w-[320px]">
                        <div className="langMultiSelect flex flex-col mx-2 w-full space-y-2">
                            <label htmlFor="languages">Languages</label>
                            <Select
                                isMulti
                                options={langOptions}
                                menuPosition="fixed"
                                components={{
                                    IndicatorSeparator: () => null,
                                    DropdownIndicator: () => (
                                        <DropdownIndicator />
                                    )
                                }}
                                onChange={handleSelectLanguages}
                                styles={multiStyle}
                            />
                        </div>
                        <div className="courseMultiSelect flex flex-col w-full mx-2 space-y-2">
                            <label htmlFor="selectableCourses">
                                Selectable Courses
                            </label>
                            <Select
                                isMulti
                                menuPosition="fixed"
                                isClearable={true}
                                isSearchable={true}
                                styles={multiStyle}
                                components={{
                                    IndicatorSeparator: () => null,
                                    DropdownIndicator: () => (
                                        <DropdownIndicator />
                                    )
                                }}
                                value={selectedCourses.map((course) => {
                                    if (course.name !== "")
                                        return {
                                            value: course.id,
                                            label: course.name
                                        };
                                })}
                                onChange={handleSelectCourse}
                                options={courseOptions}
                            />
                        </div>
                    </div>
                    <div className="form-row-3 md:flex min-w-[320px]">
                        <div className="form-row-3-1 flex w-full min-w-[50%]">
                            <div className="partner-institution-select w-full mx-2 space-y-2">
                                <label htmlFor="partnerInstitution">
                                    Partner Institution
                                </label>
                                <Select
                                    className={"placeholder:text-white"}
                                    options={institutionsOptions}
                                    menuPosition="fixed"
                                    components={{
                                        IndicatorSeparator: () => null,
                                        DropdownIndicator: () => (
                                            <DropdownIndicator />
                                        )
                                    }}
                                    styles={singleStyle}
                                />
                            </div>
                        </div>
                        <div className="form-row-3-2 md:flex w-full">
                            <div className="application-start-date flex flex-col mx-2 space-y-2 w-full">
                                <label htmlFor="applicationStartDate">
                                    Aplication Start Date
                                </label>
                                <input
                                    ref={startDateRef}
                                    className={`placeholder:text-[${inputStyle["placeholderColor"]}]`}
                                    type="text"
                                    placeholder="XX/XX/XXXX"
                                    style={inputStyle}
                                />
                            </div>
                            <span className="arrow pt-10">{">"}</span>
                            <div className="application-end-date flex flex-col mx-2 space-y-2 w-full">
                                <label htmlFor="applicationEndDate">
                                    Aplication End Date
                                </label>
                                <input
                                    ref={endDateRef}
                                    className={`placeholder:text-[${inputStyle["placeholderColor"]}]`}
                                    type="text"
                                    placeholder="XX/XX/XXXX"
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-row-4 md:flex">
                        <div className="project-description flex flex-col w-full mx-2 space-y-2">
                            <label htmlFor="projectDescription">
                                Project Description
                            </label>
                            <textarea
                                ref={projectDescriptionRef}
                                className={`mt-2 placeholder:text-[${inputStyle["placeholderColor"]}]`}
                                placeholder="Type the description..."
                                rows={18}
                                style={textAreaStyle}
                            />
                        </div>
                        <div className="project-criteria mx-2 space-y-2 w-full">
                            <label htmlFor="projectCriteria">
                                Project Criteria
                            </label>
                            <ul className="overflow-auto w-max-[460px]">
                                {criterias.map((c, index) => (
                                    <li
                                        key={index}
                                        value={c}
                                        onChange={(event: any) => {
                                            const updatedCriterias = [
                                                ...criterias
                                            ];
                                            updatedCriterias[index] =
                                                event.target.value;
                                            setCriterias(updatedCriterias);
                                        }}
                                        className={`${c} criteria-item flex items-center mt-1 mb-3`}
                                    >
                                        <TrashButton
                                            onRemoveCriteria={() => {
                                                handleRemoveCriteria(index);
                                            }}
                                        />
                                        <input
                                            className={`w-full placeholder:text-[${inputStyle["placeholderColor"]}]`}
                                            type="text"
                                            placeholder="Type your criteria..."
                                            style={inputStyle}
                                        />
                                    </li>
                                ))}
                                <button
                                    onClick={handleAddCriteria}
                                    className="add-criteria text-[#2684FF] text-semibold"
                                >
                                    + Add Criteria
                                </button>
                            </ul>
                        </div>
                    </div>
                    <div className="button-row flex">
                        <div className="w-full"></div>
                        <button
                            className="confirm w-[110px] text-white px-4 p-2 bg-red-600 me-5 rounded-3xl"
                            onClick={() =>
                                navigate(isProject ? "/Projects" : "/Activity")
                            }
                        >
                            Voltar
                        </button>
                        <button
                            className="confirm text-white px-4 p-2 bg-[#2684ff] rounded-3xl"
                            onClick={handlePost}
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateActivityForm;
