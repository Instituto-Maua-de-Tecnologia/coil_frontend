import Fontys from "../assets/fontys.jpg";
import { Project } from "../types";

export const Projects: Project[] = [
    {
        id: 1,
        avatarUrl: Fontys,
        title: "Project Manager",
        partnerName: "Maua",
        status: "Open",
        languages: ["be", "nl", "br"],
        country: "nl"
    },
    {
        id: 2,
        avatarUrl: Fontys,
        title: "Klarity 2",
        partnerName: "Fontys",
        status: "Closed",
        languages: ["be", "nl", "br"],
        country: "nl"
    }
];
