import { ReactNode } from "react";
import HomeIcon from "@components/Icons/HomeIcon";
import COILIcon from "@components/Icons/COILIcon";
import MobilityIcon from "@components/Icons/MobilityIcon";
import UserIcon from "@components/Icons/UserIcon";
import ModeratorIcon from "@components/Icons/ModeratorIcon";
import ResultsIcon from "@components/Icons/ResultsIcon";

interface NavigationItem {
    id: string;
    title?: string;
    url?: string;
    gap?: boolean;
    smgap?: boolean;
    br?: boolean;
    purple?: boolean;
    blue?: boolean;
    access?: number;
    icon: ReactNode;
}

/* eslint-disable */
const user = () => {
    try {
        return JSON.parse(localStorage.getItem("user") || "");
    } catch {
        return "";
    }
};

const { name, user_type } = user();
/* eslint-enable */

export const navigation: NavigationItem[] = [
    {
        id: "0",
        title: "Home",
        icon: <HomeIcon fill="white" size={20} />,
        url: "/Home"
    },
    // {
    //     id: "1",
    //     title: "Institution",
    //     icon: institutionIcon,
    //     url: "/Institution"
    // },
    {
        id: "2",
        title: "COIL",
        icon: <COILIcon fill="white" size={20} />,
        url: "/COIL"
    },
    {
        id: "3",
        title: "Mobility",
        url: "/Mobilities",
        icon: <MobilityIcon fill="white" size={20} />
    },
    // {
    //     id: "4",
    //     br: true,
    //     icon: <HomeIcon fill="white" size={20}/>
    // },
    // {
    //     id: "5",
    //     title: "Enrolled",
    //     url: "/Enrolled",
    //     icon: enrolledIcon,
    //     smgap: true,
    //     access: "student"
    // },
    {
        id: "6",
        title: "Results",
        icon: <ResultsIcon fill="white" size={20} />,
        url: "/Results",
        access: 1,
        smgap: true
    },
    {
        id: "7",
        title: `${name?.substring(1, name.indexOf(" ")) ? name.substring(0, name.indexOf(" ")) || name : ""}`,
        icon:
            user_type < 2 ? (
                <UserIcon fill="white" size={20} />
            ) : (
                <ModeratorIcon fill="white" size={20} />
            ),
        url: "/User",
        blue: true
    },
    {
        id: "8",
        title: "Sign Out",
        icon: <HomeIcon fill="white" size={20} />,
        url: "/Signout",
        purple: true
    }
];
