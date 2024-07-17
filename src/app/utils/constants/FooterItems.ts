import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
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
        link: "https://github.com/Instituto-Maua-de-Tecnologia/"
    },
    {
        name: "Youtube",
        icon: FaYoutube,
        link: "https://www.youtube.com/infomaua"
    },
    {
        name: "Instagram",
        icon: FaInstagram,
        link: "https://www.instagram.com/infomaua/"
    }
];
