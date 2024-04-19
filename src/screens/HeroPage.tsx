import Hero from "@components/Hero.tsx";
import { ImageTrack } from "@components/ImageTrack";
import scrollTrackItems from "@constants/ScrollTrackItems";
import TrackItem from "@components/TrackItem";
import CarouselComponent from "@components/Carousel";
import "@style/hero.css";
import Footer from "@components/Footer";
import HeroCard from "@components/HeroCard";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import ToasterContainer from "@components/ToasterContainer.tsx";

export default function HeroPage() {
    const msalInstance = new PublicClientApplication({
        auth: {
            clientId: import.meta.env.VITE_CLIENT_ID as string,
            authority: import.meta.env.VITE_AUTHORITY as string,
            redirectUri: "/"
        }
    });
    return (
        <MsalProvider instance={msalInstance}>
            <ToasterContainer />
            <div className="bg-white">
                <Hero />
                <div className="my-24 lg:my-48">
                    <h1 className="text-center text-lg font font-semibold text-blue-500 my-2">
                        Our Partners
                    </h1>
                    <ImageTrack direction="right" speed={10} className="my-5">
                        {scrollTrackItems.map((trackItem, index) => (
                            <TrackItem key={index} trackItem={trackItem} />
                        ))}
                    </ImageTrack>
                </div>
                <HeroCard />
                <div className=" w-full h-auto blue-purple-gradient rounded-t-[62px]">
                    <CarouselComponent />
                </div>
                <Footer />
            </div>
        </MsalProvider>
    );
}
