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
    access?: number;

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
    {
        id: "5",
        title: "Moderators",
        url: "/CreateModerator",
        icon: enrolledIcon,
        smgap: true,
        access: 2
    },
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
        title: "",
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
