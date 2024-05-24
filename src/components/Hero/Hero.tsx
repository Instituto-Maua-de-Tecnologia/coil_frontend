import React, { useRef, useEffect } from "react";
import Curve from "@assets/hero/hero-curve.svg";
import HeroImg from "@assets/hero/hero-img.png";
import Navbar from "../GenericComponents/NavBar";
import "@style/hero.css";
import { Button } from "primereact/button";

const Hero: React.FC = () => {
    const outerContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (outerContainerRef.current) {
                const imageHeight =
                    outerContainerRef.current.querySelector("img")?.height;
                if (imageHeight) {
                    outerContainerRef.current.style.height = `${imageHeight}px`;
                }
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div
            ref={outerContainerRef}
            className="relative w-full max-h-screen h-screen"
        >
            <img
                className="absolute top-0 left-0 w-full bg-cover"
                src={HeroImg}
                alt=""
            />
            <div className="absolute bottom-0 left-0 h-2/5 w-full bg-gradient-to-b from-transparent to-white"></div>
            <div className="absolute md:w-1/4 2xs:w-full md:top-[150px] 2xs:left-0 md:left-[75%]">
                <Button
                    className="m-5 mb-2 xs:mb-2 sm:mb-5 2xs:top-[200px] xs:top-[200px] md:top-[10px] 2xs:left-0 lg:w-[50%] 2xs:w-[90%] xs:w-[40%] 2xs:h-[5%] md:text-[11px] lg:text-[16px] xlg:text-[20px]"
                    label="Open opportunities"
                    onClick={() => scrollToSection("open-opportunities")}
                />
                <Button
                    className="m-5 mt-0 xs:mt-0 sm:mt-5 2xs:top-[200px] xs:top-[200px] md:top-[10px] 2xs:left-0 lg:w-[50%] 2xs:w-[90%] xs:w-[40%] 2xs:h-[5%] xs:h-[2.5%] md:text-[11px] lg:text-[16px] xlg:text-[20px]"
                    label="International relations department"
                    onClick={() => scrollToSection("open-opportunities")}
                />
            </div>
            <div className="relative">
                <Navbar />
                <img
                    className="absolute left-0 w-full lg:-mt-[1px]"
                    src={Curve}
                    alt=""
                />
                <div className="absolute top-20 md:top-40 left-8">
                    <h1 className="hero-text text-2xl md:text-4xl lg:text-6xl font-semibold w-1/2 bg-gradient-to-r from-[#673366] from-[21%] via-[#0C5AA4] via-[47%] to-[#1782E8] to-[100%] text-transparent bg-clip-text">
                        Unlock global horizons. <br />
                        Build international connections.
                    </h1>
                </div>
            </div>
            <div className="absolute mr-5 bottom-12 left-3/4">
                <h1 className="lg:text-xl md:text-lg 2xs:hidden md:block font-medium bg-gradient-to-r from-[#673366] from-[21%] via-[#0C5AA4] via-[47%] to-[#1782E8] to-[100%] text-transparent bg-clip-text">
                    Through the COIL initiative, students have the opportunity
                    to engage with diverse cultures and enhance their skills
                    online.
                </h1>
            </div>
        </div>
    );
};

export default Hero;
