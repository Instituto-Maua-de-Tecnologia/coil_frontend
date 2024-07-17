import { useThemeDetector } from "@functions/ThemeDetector";
import account_circle from "@assets/icons/account_circle.png";
import { UserTypeEnum } from "@enums/UserTypeEnum.ts";
import IUser from "@interfaces/user/IUser.ts";

interface IUserHomeProps {
    userHome: IUser;
}

export default function UserHome({ userHome }: IUserHomeProps) {
    const { name, email, user_type } = userHome;
    const isDarkTheme = useThemeDetector();
    return (
        <div
            className={`flex 2xs:flex-col sm:flex-row wrap ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} ml-0 lg:ml-4 rounded-3xl p-4 w-full md:h-25%`}
        >
            <div className="self-center p-2 sm:w-1/6">
                <img
                    src={account_circle}
                    alt="institution-img"
                    className="avatar-img mx-auto sm:-mx-auto w-[7.23vw] rounded-full "
                />
            </div>
            <div className="2xs:text-center sm:text-left self-center p-2 sm:w-4/6">
                <div className="font-extrabold text-[32px]">{name}</div>
                <div className="mr-2 text-[16px]">
                    {email.substring(0, email.indexOf("@"))}
                </div>

                <div className="font-semibold text-[16px]">
                    Institute Maua Of Technology
                </div>
                <p className={"text-[16px]"}>{email} </p>
                <p className={"text-[16px] text-end"}>
                    {UserTypeEnum.STUDENT.valueOf() === user_type
                        ? "Student"
                        : UserTypeEnum.MODERATOR.valueOf() === user_type
                          ? "Moderator"
                          : UserTypeEnum.ADMIN.valueOf() === user_type
                            ? "Admin"
                            : "Undefined User Type"}
                </p>
            </div>
        </div>
    );
}
