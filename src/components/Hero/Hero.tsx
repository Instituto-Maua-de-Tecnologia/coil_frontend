import React, { useRef, useEffect } from "react";
import Curve from "@assets/hero-curve.svg";
import HeroImg from "@assets/hero-img.png";
import Navbar from "../GenericComponents/NavBar";
import "@style/hero.css";

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

    return (
        <div
            ref={outerContainerRef}
            className="relative w-full max-h-screen h-screen overflow-hidden"
        >
            <img
                className="absolute top-0 left-0 w-full bg-cover"
                src={HeroImg}
                alt=""
            />
            <div className="absolute bottom-0 left-0 h-2/5 w-full bg-gradient-to-b from-transparent to-white"></div>

            <div className="relative">
                <Navbar />
                <img
                    className="absolute left-0 w-full lg:-mt-[1px]"
                    src={Curve}
                    alt=""
                />
                <div className="absolute top-20 md:top-40 left-8">
                    <h1 className="hero-text text-2xl md:text-4xl lg:text-6xl font-bold w-1/2">
                        A lot of opportunities around the world
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Hero;
