import React, { useRef, useEffect, useState } from "react";
import Curve from "@assets/hero/hero-curve.svg";
import HeroImg from "@assets/hero/hero-img.png";
import Navbar from "../GenericComponents/NavBar";
import "@styles/hero.css";
import OpenOpportunities from "./OpenOpportunities";
import InstitutionCarousel from "./InstitutionCarousel";
import getCatalog from "@integrations/hero/get_catalog.ts";
import ICatalog from "@interfaces/catalog/ICatalog.ts";

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

    const [loaded, setLoaded] = useState(false);
    const [catalog, setCatalog] = useState<ICatalog>();
    console.log(catalog);

    const handleGetAllProjectsCatalog = async () => {
        try {
            const catalogValues = (await getCatalog()) as ICatalog;
            setCatalog(catalogValues);
        } catch (error) {
            console.error("Erro ao obter projetos:", error);
        } finally {
            setLoaded(true);
        }
    };

    useEffect(() => {
        const handleGets = async () => {
            await handleGetAllProjectsCatalog();
        };
        void handleGets();
    }, []);

    return (
        <>
            <div
                ref={outerContainerRef}
                className="relative w-full max-h-screen h-screen"
            >
                <img
                    className="absolute object-cover top-0 left-0 w-full 2xs:h-screen bg-cover"
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
                    <div className=" top-20 md:top-40 left-8">
                        <h1 className="top-20 md:top-40 left-8 absolute hero-text text-2xl md:text-4xl lg:text-6xl font-semibold w-1/2 bg-gradient-to-r from-[#673366] from-[21%] via-[#0C5AA4] via-[47%] to-[#1782E8] to-[100%] text-transparent bg-clip-text">
                            Unlock global horizons. <br />
                            Build international connections.
                        </h1>
                    </div>
                </div>
                <div className="absolute mr-5 bottom-12 left-3/4">
                    <h1 className="lg:text-xl md:text-lg 2xs:hidden md:block font-medium bg-gradient-to-r from-[#673366] from-[21%] via-[#0C5AA4] via-[47%] to-[#1782E8] to-[100%] text-transparent bg-clip-text">
                        Embark on a journey of global learning. From academic
                        travels to international projects, enrich your knowledge
                        and embrace cultural exchange.
                    </h1>
                </div>
            </div>
            <OpenOpportunities loaded={loaded} catalog={catalog as ICatalog} />
            <InstitutionCarousel
                loaded={loaded}
                catalog={catalog as ICatalog}
            />
        </>
    );
};

export default Hero;
