// import { useState } from 'react'
import { useLocation } from "react-router-dom";
import { navigation } from "../constants";
import { useThemeDetector } from "../util/ThemeDetector";

const SideBar = () => {
    const isDarkTheme = useThemeDetector();
    const pathname = useLocation();
    // const [openNavigation, setOpenNavigation] = useState(false)

    // const handleClick = () => {
    //     if (!openNavigation) return;

    //     setOpenNavigation(false)
    // }

    return (
        <div className="fixed flex">
            <div
                className={`relative lg:block w-[13rem] h-[55rem] bg-sb-bg top-[6rem] bottom-[2rem] left-[2rem] rounded-xl `}
            >
                <div className="flex flex-col pt-12 items-center justify-center">
                    <img
                        src={
                            !isDarkTheme
                                ? "/maua-fontys-light.svg"
                                : "maua-fontys-dark.svg"
                        }
                        alt="COIL logo"
                        width={130}
                        height={130}
                    />
                    <ul className={"pt-9 w-full"}>
                        {navigation.map((item, index) => (
                            <a href={item.url}>
                                <div key={index}>
                                    <li
                                        className={` mb-4                                
                                    ${item.gap && "mt-[10.5rem]"} 
                                    ${item.purple && "!bg-sb-p !text-white hover:brightness-75"}
                                    ${item.blue && "!bg-sb-t !text-white hover:opacity-80"}
                                    ${item.smgap ? "mt-[1.5rem]" : "mt-2"}
                                    ${item.br ? "-mt-[0.5rem]" : "flex items-center justify-left rounded-md p-3 mx-[1.5rem] cursor-pointer bg-sb-tb text-sb-t text-md font-medium "}
                                    ${
                                        item.url === pathname.hash
                                            ? `bg-sb-t text-sb-bg transition-colors ${item.icon && "fill-current text-sb-bg"}`
                                            : ""
                                    }
                                `}
                                    >
                                        <div className="flex justifty-left">
                                            <img
                                                src={item.icon}
                                                alt={item.title}
                                                className="mr-4"
                                            />

                                            {item.title}
                                        </div>
                                    </li>
                                    {item.br && (
                                        <div className="mx-[1rem] border-b-2 border-gray-200"></div>
                                    )}
                                </div>
                            </a>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        // <div className="h-screen">
        //     <nav className="h-full w-[15rem] mt-[7rem] border rounded-full flex flex-col shadow-sm ">
        //         <div className="justify-between bg-slate-300">
        //             <h1 className="">Coil</h1>
        //             {navigation.map((item) => (
        //                 <a
        //                     key={item.id}
        //                     href={item.url}
        //                     onClick={handleClick}
        //                     className={`block relative font-code text-2xl transition-colors hover:text-color-1
        //                     ${item.url === pathname.hash
        //                             ? 'z-2 border rounded-2xl'
        //                             : 'lg:text-n-1/50'}
        //                             lg:leading-5 lg:hover:text-n-1 xl:px-12`}
        //                 >
        //                     {item.title}
        //                 </a>
        //             ))}
        //         </div>
        //     </nav>
        // </div>
    );
};

export default SideBar;
