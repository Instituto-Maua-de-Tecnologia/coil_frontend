import Hero from "@components/Hero.tsx";
import { ImageTrack } from "@components/ImageTrack";
import scrollTrackItems from "../constants/ScrollTrackItems";
import TrackItem from "@components/TrackItem";
import CarouselComponent from "@components/Carousel";
import "../style/hero.css";
import Footer from "@components/Footer";

export default function HeroPage() {
    return (
        <div className="bg-white">
            <Hero />
            <div className="mt-10">
                <h1 className="text-center text-lg font font-semibold text-blue-500 my-2">
                    Our Partners
                </h1>
                <ImageTrack direction="right" speed={10} className="my-5">
                    {scrollTrackItems.map((trackItem, index) => (
                        <TrackItem key={index} trackItem={trackItem} />
                    ))}
                </ImageTrack>
            </div>
            <div className=" w-full h-auto blue-purple-gradient rounded-t-3xl">
                <CarouselComponent />
            </div>
            <Footer />
        </div>
    );
}
