import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import authUser from "@integrations/user/authentification/auth_user.ts";
import getUser from "@integrations/user/authentification/get_user.ts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserTypeEnum } from "@enum/UserTypeEnum.ts";

const Navbar = () => {
    /* eslint-disable */
    const { instance } = useMsal();
    const navigate = useNavigate();

    async function delay(ms: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            toast
                .promise(
                    getUser({ token: token })
                        .then((user: any) => {
                            return user;
                        })
                        .catch((error) => {
                            if (error.status === 401) {
                                localStorage.clear();
                                throw new Error("Usuário não Autorizado.");
                            }
                        }),
                    {
                        loading: "Realizando Login...",
                        success: <b>Usuário logado com sucesso</b>,
                        error: (error) => error.message
                    }
                )
                .then(async (user: any) => {
                    await delay(1500);
                    handleNavigate(user);
                });
        }
    }, [localStorage.getItem("token")]);

    async function handleLogin() {
        let response = await instance.loginPopup({
            scopes: ["user.Read"]
        });
        if (response) {
            await toast
                .promise(handleGetUser(response.accessToken), {
                    loading: "Realizando Login...",
                    success: <b>Usuário logado com sucesso</b>,
                    error: (error) => error.message
                })
                .then(async () => {
                    let user = JSON.parse(
                        localStorage.getItem("user") as string
                    );
                    await delay(1500);
                    handleNavigate(user);
                });
        }
    }

    function handleNavigate(user: any) {
        if (user.user_type === UserTypeEnum.STUDENT) {
            if (!user.course || !user.semester_course) navigate("");
        }
        navigate("/Home");
    }

    async function handleGetUser(accessToken: string) {
        console.log(accessToken);
        await authUser({
            token: accessToken
        })
            .then(async (token) => {
                if (token) {
                    let user = await getUser({ token: token as string });
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", token as string);
                } else {
                    throw new Error("MissingToken");
                }
            })
            .catch((error) => {
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
    /* eslint-enable */

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
                    className="bg-purple-900 text-xs md:text-sm lg:text-md text-white py-2 px-6 rounded-full"
                >
                    Login
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
