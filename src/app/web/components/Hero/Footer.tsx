import React from "react";
import { items, FooterItem } from "@constants/FooterItems";

const Footer: React.FC = () => {
    return (
        <div className="w-full  bg-slate-900 text-gray-300 py-y px-2 z-0">
            <div className=" max-w-[1240px] mx-auto grid-cols-2 md:grid-cols-6 gap-12 border-b-2 p-2 border-gray-600 py-8 z-0">
                <div className="justify-between">
                    <h6 className="font-bold uppercase pt-2">
                        Mais sobre a Mauá
                    </h6>
                    <ul>
                        <li className="py-1 text-gray-500 hover:text-white z-20">
                            <a href="https://maua.br/" target="blank">
                                Insituto mauá de Tecnologia
                            </a>
                        </li>
                        <li className="py-1 text-gray-500 hover:text-white pb-3">
                            <a
                                href="https://maua.br/a-maua/assessoria-de-relacoes-internacionais"
                                target="blank"
                            >
                                Departamento de Relações Internacionais
                            </a>
                        </li>
                    </ul>
                    <h6 className="font-bold uppercase pt-2">Contato</h6>
                    <ul>
                        <li className="py-1 text-gray-500 hover:text-white">
                            <a>0800 019 31 00</a>
                        </li>
                        <li className="py-1 text-gray-500 hover:text-white pb-3">
                            <a>(11) 4239-3000</a>
                        </li>
                    </ul>
                    <h6 className="font-bold uppercase pt-2">Endereço</h6>
                    <ul>
                        <li className="py-1 text-gray-500 hover:text-white">
                            <a
                                href="https://www.google.com.br/maps/place/Pra%C3%A7a+Mau%C3%A1,+1+-+Mau%C3%A1,+S%C3%A3o+Caetano+do+Sul+-+SP,+09580-050/@-23.647955,-46.5768253,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce4349d922ce79:0x24575f1e1600f491!8m2!3d-23.647955!4d-46.574245!16s%2Fg%2F11c5q04db8?entry=ttu"
                                target="blank"
                            >
                                Praça Mauá 1 - São Caetano do Sul - SP - CEP:
                                09580 900
                            </a>
                        </li>
                        <li className="py-1 text-gray-500 hover:text-white">
                            <a
                                href="https://www.google.com.br/maps/place/Rua+Pedro+de+Toledo,+1071+-+Vila+Mariana,+S%C3%A3o+Paulo+-+SP,+04039-033/@-23.5983748,-46.6497552,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce5a2371ba1747:0x5cb2f86c988a7ee1!8m2!3d-23.5983748!4d-46.6471749!16s%2Fg%2F11fs25745n?entry=ttu"
                                target="blank"
                            >
                                Rua Pedro de Toledo, 1071 - Vila Mariana - SP -
                                CEP: 04039033
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col max-w-[1240px] px-10 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500 z-0">
                <div className="p-2 flex justify-center z-0">
                    <img
                        className="h-12 w-12"
                        src={"/maua-fontys-light.svg"}
                        alt="Maua Logo"
                    />
                    <p className="ml-5 py-4 z-0">2024 | COIL Project</p>
                </div>

                <div className="flex justify-between sm:w-[300px] pt-4 text-2xl ">
                    {items.map((x: FooterItem, index: number) => {
                        const Icon = x.icon;
                        const Link = x.social_media;
                        return (
                            <a
                                key={"Footer: " + index}
                                href={Link}
                                target="blank"
                            >
                                <Icon className="hover:text-white z-10" />
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Footer;
