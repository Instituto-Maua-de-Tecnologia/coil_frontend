import Fontys from "@assets/fontys.jpg";
import Maua from "@assets/maua.png";
import { Project } from "../types";

export const ProjectProps: Project[] = [
    {
        id: 1,
        avatarUrl: Maua,
        title: "Project Manager",
        partnerName: "Mauá",
        status: "Open",
        languages: ["be", "nl", "br"],
        country: "br"
    },
    {
        id: 2,
        avatarUrl: Fontys,
        title: "Collaborative Online International...",
        partnerName: "Fontys",
        status: "Closed",
        languages: ["be", "nl", "br"],
        country: "nl"
    }
];
