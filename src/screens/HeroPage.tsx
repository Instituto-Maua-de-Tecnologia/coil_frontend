import Hero from "@components/Hero.tsx";
import { InfiniteLooper } from "@components/InfiniteLooper";
import scrollTrackItems from "../constants/ScrollTrackItems";
import TrackItem from "@components/TrackItem";

export default function HeroPage() {
    return (
        <>
            <Hero />
            <InfiniteLooper direction="right" speed={10} className="my-5">
                {scrollTrackItems.map((trackItem, index) => (
                    <TrackItem key={index} trackItem={trackItem} />
                ))}
            </InfiniteLooper>
        </>
    );
}
