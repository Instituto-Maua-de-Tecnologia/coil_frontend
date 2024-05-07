import Fontys from "@assets/logo/fontys.jpg";
import Maua from "@assets/logo/maua.png";
import { Institution } from "../types.ts";

export const InstitutionsProps: Institution[] = [
    {
        id: 1,
        avatarUrl: Maua,
        name: "Mauá Institute Of Technology",
        website: "https://maua.br",
        email: "email@maua.br",
        country: "br"
    },
    {
        id: 2,
        avatarUrl: Fontys,
        name: "Fontys University of Applied Sciences",
        website: "fontys.com.nl",
        email: "fontys@edu.nl",
        country: "nl"
    }
];
