import { ReactElement } from "react";
import {
    devider,
    enrolledIcon,
    activityIcon,
    homeIcon,
    institutionIcon,
    projectIcon,
    resultsIcon,
    signOutIcon,
    userIcon
} from "@assets/icons";

interface NavigationItem {
    id: string;
    title?: string;
    url?: string;
    gap?: boolean;
    smgap?: boolean;
    br?: boolean;
    purple?: boolean;
    blue?: boolean;
    access?: string;

    icon: ({
        className,
        fill
    }: {
        className?: string;
        fill?: string;
    }) => ReactElement;
}

/* eslint-disable */
const user = () => {
    try {
        return JSON.parse(localStorage.getItem("user") || "");
    } catch {
        return "";
    }
};

const { name } = user();
/* eslint-enable */

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
        title: "Projects",
        icon: projectIcon,
        url: "/Projects"
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
    {
        id: "5",
        title: "Enrolled",
        url: "/Enrolled",
        icon: enrolledIcon,
        smgap: true,
        access: "student"
    },
    {
        id: "6",
        title: "Results",
        icon: resultsIcon,
        url: "/Results",
        access: "student"
    },
    {
        id: "7",
        title: `${name}`,
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
