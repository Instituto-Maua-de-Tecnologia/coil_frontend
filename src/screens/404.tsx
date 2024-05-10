import { Link } from "react-router-dom";
import darkMauaLogo from "@assets/maua-fontys-dark.svg";
import lightMauaLogo from "@assets/maua-fontys-light.svg";
import { useThemeDetector } from "@util/ThemeDetector.ts";

export default function Error404() {
    const isDarkTheme = useThemeDetector();
    return (
        <div className={"relative w-full h-screen overflow-hidden"}>
            <img
                src={isDarkTheme ? lightMauaLogo : darkMauaLogo}
                className={
                    "absolute object-cover -bottom-[8vh] right-0 sm:-right-44 md:-right-72 lg:-right-96 lg:-top-96  -rotate-[30deg] -z-10"
                }
                alt={"logo"}
            />
            <div className={"xl:p-48 p-1 sm:p-20 text-center sm:text-start"}>
                <h1
                    className={
                        "text-transparent bg-clip-text bg-gradient-to-r font-bold from-[#673366] sm:from-5% from-15% via-[#0C5AA4] sm:via-50% md:via-40% lg:via-20% via-70% to-[#2684FF] sm:to-80% md:to-70% lg:to-60% to-95%"
                    }
                    style={{ fontSize: "80px" }}
                >
                    404 Error
                </h1>
                <p
                    className={
                        "text-transparent text-wrap break-words bg-clip-text bg-gradient-to-r font-bold from-[#673366] sm:from-5% from-15% via-[#0C5AA4] sm:via-50% md:via-40% lg:via-20% via-70% to-[#2684FF] sm:to-80% md:to-70% lg:to-60% to-95%"
                    }
                    style={{ fontSize: "36px" }}
                >
                    Sorry, we couldn’t find{<br />} the page you're{<br />}{" "}
                    looking for
                </p>
                <Link to={"/"}>
                    <button
                        className={
                            "rounded-3xl mt-12 text-center w-[90%] justify-self-center sm:w-[323px] text-white font-bold bg-gradient-to-r p-1 from-[#673366] via-[#0C5AA4] to-[#2684FF]"
                        }
                        style={{ fontSize: "36px" }}
                    >
                        Return Home
                    </button>
                </Link>
            </div>
        </div>
    );
}
