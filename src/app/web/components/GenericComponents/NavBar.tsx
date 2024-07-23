import { useMsal } from "@azure/msal-react";
import authUser from "@integrations/user/authentification/auth_user.ts";
import getUser from "@integrations/user/authentification/get_user.ts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const Navbar = () => {
    const { instance } = useMsal();
    const navigate = useNavigate();

    async function delay(ms: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    async function handleLogin() {
        const response = await instance.loginPopup({
            scopes: ["user.Read"]
        });
        if (response) {
            await toast
                .promise(handleGetUser(response.accessToken), {
                    loading: "Realizando Login...",
                    success: <b>Usuário logado com sucesso</b>,
                    error: (error: Error) => error.message
                })
                .then(async () => {
                    await delay(1500);
                    handleNavigate();
                });
        }
    }

    function handleNavigate() {
        navigate("/Home");
    }

    async function handleGetUser(accessToken: string) {
        await authUser({
            token: accessToken
        })
            .then(async (token) => {
                if (token) {
                    const user = await getUser({ token: token as string });
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", token as string);
                    localStorage.removeItem("project_1");
                    localStorage.removeItem("project_2");
                    localStorage.removeItem("project_id");
                    localStorage.removeItem("institution_id");
                } else {
                    throw new Error("MissingToken");
                }
            })
            .catch((error: AxiosError) => {
                if (error.status === 401) {
                    localStorage.clear();
                    throw new Error("Usuário não Autorizado.");
                } else if (error.status === 403)
                    throw new Error("E-mail deve ser do domínio maua.br!");
                else if (error.message === "MissingToken")
                    throw new Error(
                        "Erro ao localizar o token de acesso. Por favor, tente novamente."
                    );
                else
                    throw new Error(
                        "Falha ao realizar login. Por favor, tente mais tarde."
                    );
            });
    }

    return (
        <nav className="p-2 bg-white bg-opacity-90 w-full">
            <div className="mx-5 flex justify-between items-center">
                <div className="flex items-center">
                    <img
                        className="h-12 md:h-14 lg:h-16 w-auto mr-2"
                        src={"maua-fontys-dark.svg"}
                        alt="Logo"
                    />
                </div>

                <button
                    onClick={handleLogin} // eslint-disable-line
                    className="shadow-lg hover:opacity-90 w-20 sm:w-40 h-10 hover:shadow-xl transition-shadow duration-300 bg-purple-900 text-xs md:text-sm lg:text-md text-white py-2 px-6 rounded-full"
                >
                    Login
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
