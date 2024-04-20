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
        <li className="flex items-center  bg-slate-100 rounded-3xl p-4 mb-4 w-full">
            <div className="flex items-center justify-between mb-4 w-full min-h-20">
                <div className="flex items-center">
                    <div className="avatar-wrapper mr-4 w-16">
                        <img
                            src={avatarUrl}
                            alt="Avatar"
                            className="avatar-img w-full rounded-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-2 font-bold">{name}</div>
                        <div className="flex mb-2">
                            <div className="flex flex-row items-center">
                                <p className="text-xs mr-2">Country</p>
                                <SVGIcon
                                    src={`https://hatscripts.github.io/circle-flags/flags/${country}.svg`}
                                    className="w-4 m-[1px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center flex-col gap-4 justify-end mr-2">
                    <div
                        className={` ${status === "Open" ? "text-green-500" : "text-red-500"}`}
                    >
                        {status}
                    </div>
                    <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full">
                        Enroll
                    </button>
                </div>
            </div>
        </li>
    );
}
