import { ReactElement } from "react";
import {
    devider,
    enrolledIcon,
    homeIcon,
    institutionIcon,
    projectIcon,
    resultsIcon,
    signOutIcon,
    userIcon
} from "../assets/icons";

interface NavigationItem {
    id: string;
    title?: string;
    url?: string;
    gap?: boolean;
    smgap?: boolean;
    br?: boolean;
    purple?: boolean;
    blue?: boolean;
    icon: ({
        className,
        fill
    }: {
        className?: string;
        fill?: string;
    }) => ReactElement;
}

export const navigation: NavigationItem[] = [
    {
        id: "0",
        title: "Home",
        icon: homeIcon,
        url: "/"
    },
    {
        id: "1",
        title: "Institutions",
        icon: institutionIcon,
        url: "/Institutions"
    },
    {
        id: "2",
        title: "Projects",
        icon: projectIcon,
        url: "/Projects"
    },
    {
        id: "3",
        br: true,
        icon: devider
    },
    {
        id: "4",
        title: "Enrolled",
        url: "/Enrolled",
        icon: enrolledIcon,
        smgap: true
    },
    {
        id: "5",
        title: "Results",
        icon: resultsIcon,
        url: "/Results"
    },
    {
        id: "6",
        title: "User",
        icon: userIcon,
        url: "/User",
        gap: true,
        blue: true
    },
    {
        id: "7",
        title: "Sign Out",
        icon: signOutIcon,
        url: "/Signout",
        purple: true
    }
];
