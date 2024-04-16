import Hero from "@components/Hero.tsx";
import { ImageTrack } from "@components/ImageTrack";
import scrollTrackItems from "../constants/ScrollTrackItems";
import TrackItem from "@components/TrackItem";

export default function HeroPage() {
    return (
        <>
            <Hero />
            <ImageTrack direction="right" speed={10} className="my-5">
                {scrollTrackItems.map((trackItem, index) => (
                    <TrackItem key={index} trackItem={trackItem} />
                ))}
            </ImageTrack>
        </>
    );
}
