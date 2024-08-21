import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import { IconType } from "react-icons/lib";

export interface FooterSection {
    title: string;
    items: string[];
}

export interface FooterItem {
    name: string;
    icon: IconType;
    social_media: string;
}

export const sections: FooterSection[] = [
    {
        title: "Mais sobre a Mauá",
        items: [
            "https://maua.br/",
            "https://maua.br/a-maua/assessoria-de-relacoes-internacionais"
        ]
    },
    {
        title: "Contato",
        items: ["0800 019 31 00", "(11) 4239-3000"]
    },
    {
        title: "Endereço",
        items: [
            "Praça Mauá 1 - São Caetano do Sul - SP - CEP: 09580 900",
            "Rua Pedro de Toledo, 1071 - Vila Mariana - SP - CEP: 04039033"
        ]
    }
];

export const items: FooterItem[] = [
    {
        name: "Github",
        icon: FaGithub,
        social_media: "https://github.com/Instituto-Maua-de-Tecnologia/"
    },
    {
        name: "Youtube",
        icon: FaYoutube,
        social_media: "https://www.youtube.com/infomaua"
    },
    {
        name: "Instagram",
        icon: FaInstagram,
        social_media: "https://www.instagram.com/infomaua/"
    }
];
