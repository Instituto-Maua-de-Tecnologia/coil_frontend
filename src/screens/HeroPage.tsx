import Hero from "@components/Hero/Hero";
import { ImageTrack } from "@components/ImageInstances/ImageTrack";
import scrollTrackItems from "@constants/ScrollTrackItems";
import TrackItem from "@components/GenericComponents/TrackItem";
import CarouselComponent from "@components/Hero/Carousel";
import "@style/hero.css";
import Footer from "@components/Hero/Footer";
import HeroCard from "@components/Hero/HeroCard";
import ToasterContainer from "@components/GenericComponents/ToasterContainer";

export default function HeroPage() {
    return (
        <>
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
        </>
    );
}
