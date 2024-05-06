import UserCard from "./UserCard";
import { useThemeDetector } from "@util/ThemeDetector.ts";
export default function UserInfo() {
    /* eslint-disable */
    const user = JSON.parse(localStorage.getItem("user") || "");
    console.log(user);
    /* eslint-enable */
    const isDarkTheme = useThemeDetector();
    return (
        <div
            className={`w-full max-h-[85%] lg:ml-4 px-7 py-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-sb-bg"} rounded-3xl`}
        >
            <div className="w-full h-full my-auto">
                <UserCard userCard={user} /> {/* eslint-disable-line */}
            </div>
        </div>
    );
}
