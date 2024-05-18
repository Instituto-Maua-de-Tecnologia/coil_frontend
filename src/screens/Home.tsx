import TitleHeader from "@components/GenericComponents/TitleHeader";
import SideBar from "@components/GenericComponents/SideBar";
import ProjectList from "@components/Project/ProjectList";
import EnrolledList from "@components/GenericComponents/EnrolledList";
import UserHome, { UserHomeProps } from "@components/User/UserHome";
import { useState, useEffect } from "react";

export default function Home() {
    const [user, setUser] = useState<UserHomeProps | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userTemp = localStorage.getItem("user");
        if (userTemp) {
            const parsedUser = JSON.parse(userTemp);
            setUser({
                userHome: {
                    id: parsedUser.id,
                    name: parsedUser.name,
                    email: parsedUser.email,
                    user_type: parsedUser.user_type,
                    created_at: parsedUser.created_at,
                    updated_at: parsedUser.updated_at
                }
            });
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>No user data available.</p>
            </div>
        );
    }

    return (
        <div className="max-h-screen flex flex-col">
            <TitleHeader title={"Home"} />
            <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                <SideBar />
                <div className="custom-scrollbar overflow-y-hidden max-h-screen flex-col w-full">
                    <div
                        className={`flex 2xs:flex-col sm:flex-row wrap rounded-3xl w-full md:h-25%`}
                    >
                        <UserHome userHome={user.userHome} />
                    </div>
                    <div className="mt-4 md:flex h-full w-full md:h-3/4">
                        <ProjectList isAdmin={user.userHome.user_type === 3} />
                        {user.userHome.user_type === 1 && (
                            <EnrolledList type_activity={true} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
