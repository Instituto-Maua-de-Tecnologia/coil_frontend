import Fontys from "@assets/logo/fontys.jpg";
import Maua from "@assets/logo/maua.png";
import { Mobility } from "../types";

export const MobilityProps: Mobility[] = [
    {
        id: 1,
        avatarUrl: Maua,
        title: "Mobility Manager",
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
