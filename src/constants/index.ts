import { ReactElement } from "react";
import {
    RxCrop,
    RxDesktop,
    RxPencil2,
    RxReader,
    RxRocket,
    RxAccessibility
} from "react-icons/rx";

import image1 from "../assets/fontys.png";
import image2 from "../assets/maua.png";
import image3 from "../assets/fontys.png";
import image4 from "../assets/maua.png";
import image5 from "../assets/fontys.png";
import image6 from "../assets/maua.png";

import {
    homeIcon,
    institutionIcon,
    projectIcon,
    enrolledIcon,
    resultsIcon,
    userIcon,
    signOutIcon,
    devider
} from "../assets/icons/";

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
        url: "/home"
    },
    {
        id: "1",
        title: "Institutions",
        icon: institutionIcon,
        url: "/institutions"
    },
    {
        id: "2",
        title: "Projects",
        icon: projectIcon,
        url: "/projects"
    },
    {
        id: "3",
        br: true,
        icon: devider
    },
    {
        id: "4",
        title: "Enrolled",
        url: "/enrolled",
        icon: enrolledIcon,
        smgap: true
    },
    {
        id: "5",
        title: "Results",
        icon: resultsIcon,
        url: "/results"
    },
    {
        id: "6",
        title: "User",
        icon: userIcon,
        url: "/user",
        gap: true,
        blue: true
    },
    {
        id: "7",
        title: "Sign Out",
        icon: signOutIcon,
        url: "/signout",
        purple: true
    }
];

export const ServiceData = [
    {
        icon: RxCrop,
        title: "Development",
        content: "Lorem ipsum dolor sit /amet, consectetur adipiscing elit.",
        backgroundImage: image1
    },
    {
        icon: RxPencil2,
        title: "Branding",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        backgroundImage: image2
    },
    {
        icon: RxDesktop,
        title: "Design",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        backgroundImage: image3
    },
    {
        icon: RxReader,
        title: "Seo",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        backgroundImage: image4
    },
    {
        icon: RxAccessibility,
        title: "Management",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        backgroundImage: image5
    },
    {
        icon: RxRocket,
        title: "Production",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        backgroundImage: image6
    }
];
