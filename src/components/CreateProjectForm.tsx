import Select from "react-select";

// interface CreateProjectProps {
//     projects: Project[];
//     isFilter: boolean;
// }

const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
];

const partnerInstitutionOptions = [
    { value: "fontys", label: "Fontys University of Applied Sciences" },
    { value: "maua", label: "Instituto Mauá de Tecnologia" }
];

const projectStatusOptions = [
    { value: "to_start", label: "To Start" },
    { value: "active", label: "Open" },
    { value: "on_hold", label: "On Hold" },
    { value: "ended", label: "Closed" },
    { value: "cancelled", label: "Cancelled" }
];

export default function CreateProject() {
    return (
        <div className="w-full ml-4 px-7 py-4 bg-sb-bg rounded-3xl">
            <div className="form">
                <div className="form-row-1 flex flex-col">
                    <label htmlFor="projectName">Project Name</label>
                    <input type="text" />
                </div>
                <div className="form-row-2 flex">
                    <div className="langMultiSelect">
                        <label htmlFor="languages">Languages</label>
                        <Select isMulti options={options} />
                    </div>
                    <div className="courseMultiSelect">
                        <label htmlFor="selectableCourses">
                            Selectable Courses
                        </label>
                        <Select isMulti options={options} />
                    </div>
                </div>
                <div className="form-row-3 flex">
                    <div className="partner-institution-select">
                        <label htmlFor="partnerInstitution">
                            Partner Institution
                        </label>
                        <Select options={partnerInstitutionOptions}></Select>
                    </div>
                    <div className="project-status-select">
                        <label htmlFor="partnerInstitution">
                            Project Status
                        </label>
                        <Select options={projectStatusOptions}></Select>
                    </div>
                    <div className="application-start-date flex flex-col">
                        <label htmlFor="applicationStartDate">
                            Aplication Start Date
                        </label>
                        <input type="text" />
                    </div>
                    <span className="arrow">{">"}</span>
                    <div className="application-end-date flex flex-col">
                        <label htmlFor="applicationEndDate">
                            Aplication End Date
                        </label>
                        <input type="text" />
                    </div>
                </div>
            </div>
        </div>
    );
}
