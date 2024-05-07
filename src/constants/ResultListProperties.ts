import Fontys from "@assets/logo/fontys.jpg";
import Maua from "@assets/logo/maua.png";
import { Result } from "../types";

export const ResultProps: Result[] = [
    {
        id: 1,
        avatarUrl: Maua,
        title: "Project Manager",
        partnerName: "Mauá",
        status: "Open",
        languages: ["be", "nl", "br"],
        country: "br",
        approvation: "Approved"
    },
    {
        id: 2,
        avatarUrl: Fontys,
        title: "Collaborative Online International...",
        partnerName: "Fontys",
        status: "Closed",
        languages: ["be", "nl", "br"],
        country: "nl",
        approvation: "Denied"
    }
];
