import { FaGithub } from "react-icons/fa";
import { IconType } from "react-icons/lib";

export interface FooterSection {
    title: string;
    items: string[];
}

export interface FooterItem {
    name: string;
    icon: IconType;
    link: string;
}

export const sections: FooterSection[] = [
    {
        title: "Section name",
        items: [
            "Section Item",
            "Section Item",
            "Section Item",
            "Section Item",
            "Section Item"
        ]
    },
    {
        title: "Section name",
        items: [
            "Section Item",
            "Section Item",
            "Section Item",
            "Section Item",
            "Section Item"
        ]
    }
];

export const items: FooterItem[] = [
    { name: "Github", icon: FaGithub, link: "https://github.com/" }
];
