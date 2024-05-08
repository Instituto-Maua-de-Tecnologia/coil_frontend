import UserCard, { UserCardProps } from "./UserCard";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import { useEffect, useState } from "react";

export default function UserInfo() {
    const [user, setUser] = useState<UserCardProps>({
        userCard: {
            id: "",
            name: "",
            email: "",
            user_type: 0,
            course: "",
            semester_course: 0,
            created_at: "",
            updated_at: ""
        }
    });
    useEffect(() => {
        const userTemp = localStorage.getItem("user") as string;
        if (userTemp) {
            setUser({
                userCard: {
                    id: JSON.parse(userTemp).id,
                    name: JSON.parse(userTemp).name,
                    email: JSON.parse(userTemp).email,
                    user_type: JSON.parse(userTemp).user_type,
                    course: JSON.parse(userTemp).course,
                    semester_course: JSON.parse(userTemp).semester_course,
                    created_at: JSON.parse(userTemp).created_at,
                    updated_at: JSON.parse(userTemp).updated_at
                }
            });
        }
        console.log(localStorage.getItem("token") as string);
    }, [localStorage.getItem("user")]);

    const isDarkTheme = useThemeDetector();
    return (
        <div
            className={`w-full max-h-[85%] lg:ml-4 px-7 py-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-sb-bg"} rounded-3xl`}
        >
            <div className="w-full h-full my-auto">
                {user && <UserCard userCard={user.userCard} />}
            </div>
        </div>
    );
}
