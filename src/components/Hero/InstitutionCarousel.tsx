import TrackItem from "@components/GenericComponents/TrackItem";
import { ImageTrack } from "@components/ImageInstances/ImageTrack";
import scrollTrackItems from "@constants/ScrollTrackItems";
import HeroCard from "./HeroCard";

export default function InstitutionCarousel() {
    return (
        <>
            <div
                id="international-department"
                className="mt-10 md:mt-8 lg:mt-5 my-50 lg:my-48"
            >
                <h1 className="text-center mt-5 pt-5 mb-5 text-2xl md:text-4xl lg:text-5xl font font-semibold hero-text my-2">
                    Our Partners
                </h1>
                <ImageTrack direction="right" speed={10} className="my-5">
                    {scrollTrackItems.map((trackItem, index) => (
                        <TrackItem key={index} trackItem={trackItem} />
                    ))}
                </ImageTrack>
                <HeroCard />
            </div>
        </>
    );
}
