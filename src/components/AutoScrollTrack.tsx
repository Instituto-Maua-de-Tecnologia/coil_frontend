import React from "react";
import "../style/hero.css";

interface TrackItemProps {
    trackItem: { imgUrl: string; title: string };
}

const TrackItem: React.FC<TrackItemProps> = ({ trackItem }) => {
    const { imgUrl } = trackItem;

    return (
        <div className="w-24 h-24 mx-10">
            <img
                src={imgUrl}
                alt=""
                className="w-full h-full object-cover rounded-full"
            />
        </div>
    );
};

const AutoScrollTrack: React.FC<{
    trackItems: { imgUrl: string; title: string }[];
}> = ({ trackItems }) => {
    return (
        <div
            id="image-track-wrapper"
            className="w-screen relative h-24 my-2 border-2 border-red-500 items-center justify-center overflow-hidden"
        >
            <div
                id="image-track"
                className="absolute h-full left-0 flex flex-row justify-center items-center "
            >
                {trackItems.map((trackItem, index) => (
                    <TrackItem key={index} trackItem={trackItem} />
                ))}
            </div>
        </div>
    );
};

export default AutoScrollTrack;
