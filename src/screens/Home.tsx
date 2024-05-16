import TitleHeader from "@components/GenericComponents/TitleHeader";
import SideBar from "@components/GenericComponents/SideBar";
import ProjectList from "@components/Project/ProjectList";
import UserHome, { UserHomeProps } from "@components/User/UserHome";
import { useState, useEffect } from "react";

export default function Home() {
    const [user, setUser] = useState<UserHomeProps>({
        userHome: {
            name: "",
            id: "",
            email: "",
            user_type: 0,
            created_at: "",
            updated_at: ""
        }
    });
    useEffect(() => {
        const userTemp = localStorage.getItem("user") as string;
        if (userTemp) {
            setUser({
                userHome: {
                    id: JSON.parse(userTemp).id,
                    name: JSON.parse(userTemp).name,
                    email: JSON.parse(userTemp).email,
                    user_type: JSON.parse(userTemp).user_type,
                    // course: JSON.parse(userTemp).course,
                    // semester_course: JSON.parse(userTemp).semester_course,
                    created_at: JSON.parse(userTemp).created_at,
                    updated_at: JSON.parse(userTemp).updated_at
                }
            });
        }
    }, [localStorage.getItem("user")]);

    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Home"} />
                <div className="flex-grow h-screen overflow-hidden mx-3 mb-3 flex flex-row">
                    <SideBar />
                    <div className="custom-scrollbar overflow-auto lg:overflow-hidden max-h-screen flex-col w-full ">
                        <div
                            className={`flex 2xs:flex-col sm:flex-row wrap rounded-3xl w-full md:h-25%`}
                        >
                            {user && <UserHome userHome={user.userHome} />}
                        </div>
                        <div className="mt-4 lg:flex h-full w-full md:h-3/4">
                            <ProjectList />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
