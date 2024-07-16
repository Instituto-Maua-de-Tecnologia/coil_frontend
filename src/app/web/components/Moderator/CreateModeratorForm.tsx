import { useThemeDetector } from "@functions/ThemeDetector.ts";
import { TabPanel, TabView } from "primereact/tabview";
import { Button } from "primereact/button";
import React, { useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import createModerator from "@integrations/user/admin/create_moderator.ts";
import toast from "react-hot-toast";
import ViewModerators from "@components/Moderator/ViewModerators.tsx";
import { UserTypeEnum } from "@enums/UserTypeEnum.ts";

export default function CreateModeratorForm() {
    const isDarkTheme = useThemeDetector();
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [error, setError] = useState<string>("");

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setError("Endereço de e-mail inválido.");
            return false;
        } else {
            setError("");
            return true;
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
    };

    const handleModeratorPost = async () => {
        await toast.promise(
            createModerator({ body: { name: name, email: email } }).then(() => {
                setName("");
                setEmail("");
            }),
            {
                loading: `Cadastrando novo moderador...`,
                success: <b>Moderador criado com sucesso</b>,
                error: (error) => error.message
            }
        );
    };

    const handleModeratorButton = () => {
        if (email === "") {
            alert("Preencha os dados do formulário");
        }
        if (validateEmail(email)) {
            handleModeratorPost();
        }
    };

    return (
        <div
            className={`w-full mt-4 lg:mt-0 ml-0 lg:ml-4 px-7 py-4 ${isDarkTheme ? "bg-[#14222E] text-white" : "bg-[#FFFFFF] text-black"} rounded-3xl`}
        >
            {JSON.parse(localStorage.getItem("user") as string)?.user_type ===
            UserTypeEnum.ADMIN ? (
                <>
                    <div className="flex mb-2 gap-2 justify-center">
                        <Button
                            onClick={() => setActiveIndex(0)}
                            className="w-2rem me-10 p-5 h-2rem"
                            icon="pi pi-user ml-2"
                            outlined={activeIndex !== 0}
                            label="Create Moderator"
                        />
                        <Button
                            onClick={() => setActiveIndex(1)}
                            className="w-2rem ms-10 p-5 h-2rem"
                            icon="pi pi-search mr-2"
                            outlined={activeIndex !== 1}
                            label="View Moderators"
                        />
                    </div>
                    <TabView
                        unstyled
                        className={`${isDarkTheme ? "bg-[#14222E] text-white" : "bg-[#FFFFFF] text-black"}`}
                        activeIndex={activeIndex}
                        onTabChange={(e) => setActiveIndex(e.index)}
                    >
                        <TabPanel disabled unstyled>
                            <div className="w-full mt-52 flex justify-center items-center">
                                <div className="flex flex-col items-center">
                                    <FloatLabel>
                                        <InputText
                                            id="name"
                                            value={name}
                                            onChange={handleNameChange}
                                            className={`w-96`}
                                        />
                                        <label htmlFor="name">Name</label>
                                    </FloatLabel>
                                    <div className={"my-3"}></div>
                                    <FloatLabel>
                                        <InputText
                                            id="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            className={`${error ? "p-invalid" : ""} w-96`}
                                        />
                                        <label htmlFor="email">E-mail</label>
                                    </FloatLabel>
                                    <Button
                                        disabled={error !== ""}
                                        onClick={handleModeratorButton}
                                        className={`mt-6 ${error ? "!disabled:cursor-not-allowed disabled:opacity-50" : "cursor-pointer"}`}
                                    >
                                        Create Moderator
                                    </Button>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel disabled unstyled>
                            <ViewModerators />
                        </TabPanel>
                    </TabView>
                </>
            ) : (
                <>
                    <div className="flex mb-2 gap-2 justify-center">
                        <Button
                            onClick={() => setActiveIndex(1)}
                            disabled
                            className="w-2rem ms-10 p-5 h-2rem"
                            icon="pi pi-search mr-2"
                            outlined={activeIndex !== 1}
                            label="View Moderators"
                        />
                    </div>
                    <TabView
                        unstyled
                        className={`${isDarkTheme ? "bg-[#14222E] text-white" : "bg-[#FFFFFF] text-black"}`}
                        activeIndex={activeIndex}
                        onTabChange={(e) => setActiveIndex(e.index)}
                    >
                        <TabPanel disabled unstyled>
                            <ViewModerators />
                        </TabPanel>
                    </TabView>
                </>
            )}
        </div>
    );
}
