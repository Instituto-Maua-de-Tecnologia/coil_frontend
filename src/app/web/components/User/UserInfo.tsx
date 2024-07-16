import UserCard from "./UserCard";
import { useThemeDetector } from "@functions/ThemeDetector";
import { useEffect, useState } from "react";
import IUser from "@interfaces/user/IUser.ts";

export default function UserInfo() {
    const [user, setUser] = useState<IUser>({
        id: "",
        name: "",
        email: "",
        user_type: 0,
        created_at: "",
        updated_at: ""
    });
    useEffect(() => {
        const userTemp = localStorage.getItem("user") as string;
        if (userTemp) {
            setUser({
                id: JSON.parse(userTemp).id,
                name: JSON.parse(userTemp).name,
                email: JSON.parse(userTemp).email,
                user_type: JSON.parse(userTemp).user_type,
                created_at: JSON.parse(userTemp).created_at,
                updated_at: JSON.parse(userTemp).updated_at
            });
        }
    }, [localStorage.getItem("user")]);

    const isDarkTheme = useThemeDetector();
    return (
        <div
            className={`w-full max-h-[85%] lg:ml-4 px-7 py-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-sb-bg"} rounded-3xl`}
        >
            <div className="w-full h-full my-auto">
                {user && <UserCard userCard={user} />}
            </div>
        </div>
    );
}
