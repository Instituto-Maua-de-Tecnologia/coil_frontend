import AutoScrollTrack from "@components/AutoScrollTrack";
import Hero from "@components/Hero.tsx";
import scrollTrackItems from "../constants/ScrollTrackItems";
export default function HeroPage() {
    return (
        <>
            <Hero />
            <AutoScrollTrack trackItems={scrollTrackItems} />
            <h1>Why </h1>
        </>
    );
}
