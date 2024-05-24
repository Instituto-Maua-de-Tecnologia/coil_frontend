import TrackItem from "@components/GenericComponents/TrackItem";
import { ImageTrack } from "@components/ImageInstances/ImageTrack";
import scrollTrackItems from "@constants/ScrollTrackItems";

export default function InstitutionCarousel() {
    return (
        <>
            <div className=" my-50 mt- lg:my-48">
                <h1 className="text-center text-4xl font font-semibold text-blue-500 my-2">
                    Our Partners
                </h1>
                <ImageTrack direction="right" speed={10} className="my-5">
                    {scrollTrackItems.map((trackItem, index) => (
                        <TrackItem key={index} trackItem={trackItem} />
                    ))}
                </ImageTrack>
            </div>
        </>
    );
}
