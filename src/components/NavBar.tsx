import React from "react";
import Logo from "../../public/maua-fontys-dark.svg";

const Navbar: React.FC = () => {
    return (
        <nav className="p-2 bg-white bg-opacity-90 w-full">
            <div className="mx-5 flex justify-between items-center">
                <div className="flex items-center">
                    <img
                        className="h-12 md:h-14 lg:h-16 w-auto mr-2"
                        src={Logo}
                        alt="Logo"
                    />
                </div>

                <button className="bg-purple-900 text-xs md:text-sm lg:text-md text-white py-2 px-6 rounded-full">
                    Login
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
