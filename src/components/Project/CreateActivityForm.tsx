// import Select, { StylesConfig } from "react-select";
// import TrashButton from "./TrashButton.tsx";
// import DropdownIndicator from "../GenericComponents/DropdownIndicator.tsx";
import { useEffect, useRef, useState } from "react";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import toast from "react-hot-toast";
import createActivity from "@integrations/activity/admin&moderator/create_activity.ts";
import { useNavigate } from "react-router-dom";
import getAllInstitutions from "@integrations/institution/get_all_institution.ts";
import ToasterContainer from "@components/GenericComponents/ToasterContainer.tsx";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import "primeicons/primeicons.css";
import getActivityRequirements from "@integrations/activity/admin&moderator/get_activity_requirements.ts";
import Select, { SelectOption } from "@components/GenericComponents/Select";

type InstitutionProps = [
    {
        id: string;
        name: string;
    }
];

export type CourseListProps = [CourseProps];

export type CourseProps = {
    id: number;
    course: string;
};

export type LangListProps = [LangProps];

export type LangProps = {
    id: number;
    language: string;
};

export type LangOptionListProps = [LangOptionProps];

export type LangOptionProps = {
    value: number;
    label: string;
};

export type CriteriaProps = [
    {
        id: string;
        criteria: string;
    }
];

export type RequirementProps = {
    courses: [
        {
            id: number;
            course: string;
        }
    ];
    criterias: [
        {
            id: string;
            criteria: string;
        }
    ];
    institutions: [
        {
            id: string;
            name: string;
        }
    ];
    languages: [
        {
            id: number;
            language: string;
            language_code: string;
        }
    ];
};

interface ActivityFromData {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    languages: number[];
    partner_institutions: string[];
    courses: number[];
    criterias: {
        id: string | undefined;
        criteria: string;
    }[];
    type_activity: number;
}

interface ActivityFormProps {
    isProject: boolean;
}

const CreateActivityForm = ({ isProject }: ActivityFormProps) => {
    const [courses, setCourses] = useState<CourseListProps>([
        { id: 0, course: "" }
    ]);
    const courseOptions: SelectOption[] = courses.map((course) => ({
        label: course.course,
        value: course.id
    }));
    const [selectedCourses, setSelectedCourses] = useState<SelectOption[]>([]);
    const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);
    const [startTime, setStartTime] = useState<Nullable<Date>>(null);
    const [endTime, setEndTime] = useState<Nullable<Date>>(null);
    // const [selectedCourses, setSelectedCourses] = useState<CourseProps>([
    //     { id: 0, course: "" }
    // ]);
    const [institutions, setInstitutions] = useState<InstitutionProps>([
        { id: "", name: "" }
    ]); //TODO: verificar se a lógica está certa ou se ele está puxando todas as instituições, ele tem que puxar só as instituições selecionadas pelo usuário
    const institutionOptions: SelectOption[] = institutions.map(
        (institution) => ({
            label: institution.name,
            value: institution.id
        })
    );
    const [selectedInstitutions, setSelectedInstitutions] = useState<
        SelectOption[]
    >([]);
    const [languages, setLanguages] = useState<LangListProps>([
        { id: 0, language: "" }
    ]);
    const languageOptions: SelectOption[] = languages.map((language) => ({
        label: language.language,
        value: language.id
    }));
    const [selectedLanguages, setSelectedLanguages] = useState<SelectOption[]>(
        []
    );
    const [criterias, setCriterias] = useState<CriteriaProps>([
        { id: "", criteria: "" }
    ]);
    const criteriasOptions: SelectOption[] = criterias.map((criteria) => ({
        label: criteria.criteria,
        value: criteria.id
    }));
    const [selectedCriterias, setSelectedCriterias] = useState<SelectOption[]>(
        []
    );
    // function mapLang(lang: LangProps): LangOptionProps {
    //     const { id, language } = lang;
    //     const langOption: LangOptionProps = {
    //         value: id,
    //         label: language
    //     };
    //     return langOption;
    // }
    // const [criterias, setCriterias] = useState<CriteriaProps>([
    //     { id: 0, criteria: ""}
    // ])
    const [formData, setFormData] = useState<ActivityFromData>({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        languages: [],
        partner_institutions: [""],
        courses: [],
        criterias: [{ id: undefined, criteria: "" }],
        type_activity: isProject ? 1 : 2
    });
    const projectNameRef = useRef<HTMLInputElement>(null);
    const projectDescriptionRef = useRef<HTMLTextAreaElement>(null);

    const navigate = useNavigate();
    const isDarkTheme = useThemeDetector();

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
            const requirements =
                (await getActivityRequirements()) as RequirementProps;
            console.log(requirements);
            setCourses(requirements.courses);
            setLanguages(requirements.languages);
            setCriterias(requirements.criterias);
            // setCriterias(requirements.criterias);
        } catch (error) {
            console.error("Erro ao obter cursos:", error);
        }
    };
    //TODO: fazer verificação do: titulo(não pode ser repetido(dar um get para saber quais titulos estão em uso), não pode ser maior que 255 e menor que 3 caracteres), descrição(pode ir até ), imagens(base64), data(só pode ter número, data de ínicio tem que ser menor que a de fim, mandar informações usando dateTime() formato dd/mm/yy)

    useEffect(() => {
        handleGetAllCoursesAndInstitutions();
        // setSelectableLanguages(languages.forEach(mapLang));
    }, []);

    async function handlePostActivity() {
        const day = dates?.map((fds) => fds?.getDate());
        const month = dates?.map((fds) => fds?.getMonth());
        const year = dates?.map((fds) => fds?.getFullYear());
        const convertedStartTime = {
            hours: startTime?.getHours(),
            minutes: startTime?.getMinutes()
        };
        const convertedEndTime = {
            hours: endTime?.getHours(),
            minutes: endTime?.getMinutes()
        };
        let start_date = "";
        let end_date = "";
        if (year && month && day) {
            start_date = new Date(
                year[0] as number,
                month[0] as number,
                day[0] as number,
                convertedStartTime.hours,
                convertedStartTime.minutes
            ).toISOString();
            end_date = new Date(
                year[1] as number,
                month[1] as number,
                day[1] as number,
                convertedEndTime.hours,
                convertedEndTime.minutes
            ).toISOString();
        }
        const title = projectNameRef.current?.value || "";
        const description = projectDescriptionRef.current?.value || "";
        const courses = selectedCourses.map((fds) => Number(fds.value));
        const languages = selectedLanguages.map((lang) => Number(lang.value));
        const criterias = selectedCriterias.map((criteria) => ({
            id: undefined,
            criteria: criteria.label
        }));
        const partner_institutions: string[] = institutions.map((institution) =>
            institution.id.toString()
        );

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
                    throw new Error(
                        "Você não tem permissões para criar projeto!"
                    );
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
            });
        //.then(() => navigate("/Home")); // TODO: validação de campos vazios no if/else
    }

    // const courseOptions = courses.map((course) => ({
    //     value: course.id,
    //     label: course.course
    // }));

    // const institutionsOptions = institutions.map((institution) => ({
    //     value: institution.id,
    //     label: institution.name
    // }));

    // const handleSelectCourse = (selectedOptions: any) => {
    //     const courses = selectedOptions.map((option: any) => ({
    //         id: option.value,
    //         name: option.label
    //     }));
    //     setFormData({ ...formData, courses: courses });
    //     setSelectedCourses(courses);
    // };

    // const handleSelectLanguages = (selectedOptions: any) => {
    //     const languages = selectedOptions.map((option: any) => option.value);
    //     setFormData({ ...formData, languages: languages });
    //     // setSelectedLanguages(languages);
    // };

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
                            className={`${isDarkTheme ? "placeholder:text-[#0F1820] bg-[#223A4F]" : "placeholder:text-[#CBD0DD] bg-[#F0F3FB]"} focus:outline outline-2 font-normal outline-[#2684FF] rounded-3xl min-h-[1.5em] gap-[.5em] p-[.5em] px-6`}
                            type="text"
                            placeholder="Type the name..."
                        />
                    </div>
                    <div className="form-row-2 md:flex min-w-[320px]">
                        <div className="langMultiSelect flex flex-col mx-2 w-full space-y-2">
                            <label htmlFor="languages">Languages</label>
                            <Select
                                multiple
                                options={languageOptions}
                                value={selectedLanguages}
                                onChange={(o) => setSelectedLanguages(o)}
                            />
                        </div>
                        <div className="courseMultiSelect flex flex-col w-full mx-2 space-y-2">
                            <label htmlFor="selectableCourses">
                                Selectable Courses
                            </label>
                            <Select
                                multiple
                                options={courseOptions}
                                value={selectedCourses}
                                onChange={(o) => setSelectedCourses(o)}
                            />
                        </div>
                    </div>
                    <div className="form-row-3 md:flex min-w-[320px]">
                        <div className="form-row-3-1 flex w-full min-w-[50%]">
                            <div className="partner-institution-select flex flex-col w-full mx-2 space-y-2">
                                <label htmlFor="partnerInstitution">
                                    Partner Institution
                                </label>
                                <Select
                                    multiple
                                    options={institutionOptions}
                                    value={selectedInstitutions}
                                    onChange={(o) => setSelectedInstitutions(o)}
                                />
                            </div>
                        </div>
                        <div className="form-row-3-2 md:flex w-full">
                            <div className="application-start-date flex flex-col mx-2 space-y-2 w-[52%]">
                                <label htmlFor="applicationStartDate">
                                    Application Period
                                </label>
                                <Calendar
                                    className={"w-full "}
                                    value={dates}
                                    dateFormat={"dd/mm/yy"}
                                    onChange={(e) => setDates(e.value)}
                                    selectionMode="range"
                                    readOnlyInput
                                    showIcon
                                    inputStyle={{
                                        backgroundColor: "transparent",
                                        color: `${isDarkTheme ? "white" : "black"}`,
                                        border: "none",
                                        outline: "none",
                                        padding: "0",
                                        width: "100%",
                                        height: "100%",
                                        textAlign: "center"
                                    }}
                                    hideOnRangeSelection
                                />
                            </div>
                            <div className="application-end-date flex flex-col mx-2 space-y-2 w-[24%]">
                                <label htmlFor="applicationEndDate">
                                    Start Time
                                </label>
                                <Calendar
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.value)}
                                    showIcon
                                    timeOnly
                                    icon={() => (
                                        <i className="pi mx-1 pi-clock" />
                                    )}
                                    inputStyle={{
                                        backgroundColor: "transparent",
                                        color: `${isDarkTheme ? "white" : "black"}`,
                                        border: "none",
                                        outline: "none",
                                        padding: "0",
                                        width: "100%",
                                        height: "100%",
                                        textAlign: "center"
                                    }}
                                />
                            </div>
                            <div className="application-end-date flex flex-col mx-2 space-y-2 w-[24%]">
                                <label htmlFor="applicationEndDate">
                                    End Time
                                </label>
                                <Calendar
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.value)}
                                    showIcon
                                    timeOnly
                                    icon={() => (
                                        <i className="pi mx-1 pi-clock" />
                                    )}
                                    inputStyle={{
                                        backgroundColor: "transparent",
                                        color: `${isDarkTheme ? "white" : "black"}`,
                                        border: "none",
                                        outline: "none",
                                        padding: "0",
                                        width: "100%",
                                        height: "100%",
                                        textAlign: "center"
                                    }}
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
                                className={`${isDarkTheme ? "placeholder:text-[#0F1820] bg-[#223A4F]" : "placeholder:text-[#CBD0DD] bg-[#F0F3FB]"} focus:outline outline-2 font-normal outline-[#2684FF] rounded-3xl min-h-[1.5em] gap-[.5em] p-[.5em] px-6 py-3 resize-none`}
                                placeholder="Type the description..."
                                rows={18}
                            />
                        </div>
                        <div className="project-criteria mx-2 space-y-2 w-full">
                            <label htmlFor="projectCriteria">
                                Project Criteria
                            </label>
                            <Select
                                multiple
                                options={criteriasOptions}
                                value={selectedCriterias}
                                onChange={(o) => setSelectedCriterias(o)}
                            />
                        </div>
                    </div>
                    <div className="button-row flex">
                        <div className="w-full"></div>
                        <button
                            className="confirm w-[110px] text-white px-4 p-2 bg-[#673366] me-5 rounded-3xl"
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
