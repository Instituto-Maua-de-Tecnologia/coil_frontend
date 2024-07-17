import { ReactElement } from "react";
import {
    devider,
    //enrolledIcon,
    activityIcon,
    homeIcon,
    institutionIcon,
    projectIcon,
    resultsIcon,
    signOutIcon,
    userIcon
} from "@assets/icons";
import IUser from "@interfaces/user/IUser.ts";

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

    icon: ({
        className,
        fill
    }: {
        className?: string;
        fill?: string;
    }) => ReactElement;
}

const user = () => {
    try {
        return JSON.parse(localStorage.getItem("user") || "") as IUser;
    } catch {
        return {
            id: "",
            name: "",
            email: "",
            user_type: 0,
            created_at: "",
            updated_at: ""
        } as IUser;
    }
};

const { name } = user();

export const navigation: NavigationItem[] = [
    {
        id: "0",
        title: "Home",
        icon: homeIcon,
        url: "/Home"
    },
    {
        id: "1",
        title: "Institution",
        icon: institutionIcon,
        url: "/Institution"
    },
    {
        id: "2",
        title: "COIL",
        icon: projectIcon,
        url: "/COIL"
    },
    {
        id: "3",
        title: "Mobility",
        url: "/Mobilities",
        icon: activityIcon
    },
    {
        id: "4",
        br: true,
        icon: devider
    },
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
        icon: resultsIcon,
        url: "/Results",
        access: 1,
        smgap: true
    },
    {
        id: "7",
        title: `${name?.substring(1, name.indexOf(" ")) ? name.substring(0, name.indexOf(" ")) || name : ""}`,
        icon: userIcon,
        url: "/User",
        blue: true
    },
    {
        id: "8",
        title: "Sign Out",
        icon: signOutIcon,
        url: "/Signout",
        purple: true
    }
];
