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

    const userToken = JSON.parse(
        localStorage.getItem("user") as string
    ) as IUser;

    useEffect(() => {
        const userTemp = userToken;
        if (userTemp) {
            setUser({
                id: userTemp.id,
                name: userTemp.name,
                email: userTemp.email,
                user_type: userTemp.user_type,
                created_at: userTemp.created_at,
                updated_at: userTemp.updated_at
            });
        }
    }, []);

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
