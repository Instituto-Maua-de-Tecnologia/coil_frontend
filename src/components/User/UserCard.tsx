import account_circle from "@assets/icons/account_circle.png";
import { useThemeDetector } from "@util/ThemeDetector.ts";

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

    const isDarkTheme = useThemeDetector();

    return (
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
                                className={`w-1/2 cursor-pointer ${isDarkTheme ? "bg-[#223A4F]" : "bg-slate-100"} rounded-3xl p-4 me-5`}
                            >
                                <option value={course}>{course}</option>
                            </select>
                            <select
                                className={`w-1/2 cursor-pointer ${isDarkTheme ? "bg-[#223A4F]" : "bg-slate-100"} rounded-3xl p-4 me-5`}
                            >
                                <option value={semester_course}>
                                    {semester_course}
                                </option>
                            </select>
                        </div>
                        <p
                            className={`w-full ${isDarkTheme ? "bg-[#223A4F]" : "bg-slate-100"} rounded-3xl p-4 mb-5`}
                        >
                            {email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
