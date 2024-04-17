import React from "react";
import {
    sections,
    items,
    FooterSection,
    FooterItem
} from "@constants/FooterItems";

const Footer: React.FC = () => {
    return (
        <div className="w-full bg-slate-900 text-gray-300 py-y px-2">
            <div className="p-2">
                <img
                    className="h-12 w-12"
                    src={"/maua-fontys-light.svg"}
                    alt="Maua Logo"
                />
            </div>
            <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 gap-12 border-b-2 p-2 border-gray-600 py-8">
                {sections.map((section: FooterSection, index: number) => (
                    <div key={index}>
                        <h6 className="font-bold uppercase pt-2">
                            {section.title}
                        </h6>
                        <ul>
                            {section.items.map((item: string, i: number) => (
                                <li
                                    key={i}
                                    className="py-1 text-gray-500 hover:text-white"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500">
                <p className="py-4">2024 | COIL Project</p>
                <div className="flex justify-between sm:w-[300px] pt-4 text-2xl">
                    {items.map((x: FooterItem, index: number) => {
                        const Icon = x.icon;
                        return (
                            <Icon key={index} className="hover:text-white" />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Footer;
