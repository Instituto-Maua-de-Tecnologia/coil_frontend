import IProjectCatalog from "@interfaces/project/IProjectCatalog.ts";

interface ProjectCardProps {
    project: {
        title: string;
        logo: string;
        type_activity: number;
    };
    onClick: (project: IProjectCatalog) => void;
}

export default function ProjectCardHero({ project }: ProjectCardProps) {
    return (
        <li
            className={`sm:flex shadow-sm items-center bg-[#F0F3FB] rounded-3xl p-4 mb-4 w-full`}
        >
            <div className="flex sm:relative w-full">
                <div className="sm:flex sm:-w-full text-center sm:-text-center w-full sm:items-center">
                    <div className="sm:avatar-wrapper justify-center sm:flex flex-col mr-4">
                        <img
                            src={project.logo}
                            alt="Avatar"
                            className="object-contain shadow-lg mt-1 mb-4 sm:mt-0 sm:mb-0 max-w-32 sm:max-w-24 mx-auto rounded-full"
                        />
                    </div>

                    <div className="flex flex-col">
                        <div className="inline-flex justify-center flex-row mb-2 text-center text-black sm:text-start font-bold">
                            {project.title}
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}
