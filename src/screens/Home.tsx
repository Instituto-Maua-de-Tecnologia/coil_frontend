import TitleHeader from "@components/GenericComponents/TitleHeader";
import SideBar from "@components/GenericComponents/SideBar";
import ProjectList from "@components/Project/ProjectList";
import { UserTypeEnum } from "@enum/UserTypeEnum.ts";
import UserHome, { UserHomeProps } from "@components/User/UserHome";
import { useState, useEffect } from "react";
import MobilityList from "@components/Mobility/MobilityList";

export default function Home() {
    const [user, setUser] = useState<UserHomeProps>({
        userHome: {
            id: "",
            name: "",
            email: "",
            user_type: 0,
            // course: "",
            // semester_course: 0,
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
    const user_type = JSON.parse(
        localStorage.getItem("user") as string
    ).user_type;

    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Home"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    <div className="custom-scrollbar overflow-y-hidden  max-h-screen flex-col w-full ">
                        <div
                            className={`flex 2xs:flex-col sm:flex-row wrap rounded-3xl w-full md:h-25%`}
                        >
                            {user && <UserHome userHome={user.userHome} />}
                        </div>
                        <div className="mt-4 md:flex h-full w-full md:h-3/4">
                            <ProjectList
                                isAdmin={user_type === UserTypeEnum.ADMIN}
                            />
                            <MobilityList
                                isFilter
                                isAdmin={user_type === UserTypeEnum.ADMIN}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
