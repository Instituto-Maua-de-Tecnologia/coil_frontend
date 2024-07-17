import account_circle from "@assets/icons/account_circle.png";
import { useThemeDetector } from "@functions/ThemeDetector";
import ToasterContainer from "@components/GenericComponents/ToasterContainer.tsx";
import { UserTypeEnum } from "@enums/UserTypeEnum.ts";
import IUser from "@interfaces/user/IUser.ts";

interface IUserCardProps {
    userCard: IUser;
}

export default function UserCard({ userCard }: IUserCardProps) {
    const { name, email, user_type } = userCard;
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
                            <h1 className={"text-center text-[32px]"}>
                                {UserTypeEnum.STUDENT.valueOf() === user_type
                                    ? "Student"
                                    : UserTypeEnum.MODERATOR.valueOf() ===
                                        user_type
                                      ? "Moderator"
                                      : UserTypeEnum.ADMIN.valueOf() ===
                                          user_type
                                        ? "Admin"
                                        : "Undefined User Type"}{" "}
                                User
                            </h1>
                            <p
                                className={`${isDarkTheme ? "bg-[#223A4F]" : "bg-slate-100"} rounded-3xl mt- p-4 mb-5`}
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
                            <p
                                className={`w-full ${isDarkTheme ? "bg-[#223A4F]" : "bg-slate-100"} rounded-3xl p-4 mb-5`}
                            >
                                {email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
