import React from "react";
import Curve from "../assets/hero-curve.svg";
import HeroImg from "../assets/hero-img.png";
import Navbar from "./NavBar";
import "../style/hero.css";

const Hero: React.FC = () => {
    return (
        <div className="relative h-[500px]">
            <img
                className="absolute top-0 left-0 w-full bg-cover"
                src={HeroImg}
                alt=""
            />

            <div className="relative ">
                <Navbar />
                <img
                    className="absolute left-0 w-full mt-[-1px]"
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
