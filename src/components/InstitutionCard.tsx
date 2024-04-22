import SVGIcon from "./SVGIcon";

interface Institution {
    id: number;
    avatarUrl: string;
    name: string;
    email: string;
    country: string;
    website: string;
}

interface InstitutionCardProps {
    institution: Institution;
}

export default function InstitutionCard({ institution }: InstitutionCardProps) {
    const { avatarUrl, name, country } = institution;
    return (
        <li className="sm:flex items-center bg-slate-100 rounded-3xl p-4 mb-4 w-full">
            <div className="flex sm:relative items-center sm:justify-between mb-4 w-full sm:min-h-20">
                <div className="sm:flex sm:-w-full text-center sm:-text-center w-full sm:items-center">
                    <div className="sm:avatar-wrapper sm:flex flex-col mr-4">
                        <img
                            src={avatarUrl}
                            alt="Avatar"
                            className="avatar-img mx-auto w-16 rounded-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-2 font-bold">{name}</div>
                        <div className="flex mb-2 w-full sm:justify-start justify-center">
                            <div className="flex flex-row items-center">
                                <p className="text-xs mr-2">Country</p>
                                <SVGIcon
                                    src={`https://hatscripts.github.io/circle-flags/flags/${country}.svg`}
                                    className="w-4 m-[1px]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm:flex sm:absolute sm:right-0 items-center gap-4 sm:justify-end sm:mr-2">
                        <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full">
                            Enroll
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}
