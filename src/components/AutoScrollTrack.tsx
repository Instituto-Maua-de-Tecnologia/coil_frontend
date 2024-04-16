import React from "react";

interface TrackItemProps {
    trackItem: { imgUrl: string; title: string };
}

const TrackItem: React.FC<TrackItemProps> = ({ trackItem }) => {
    const { imgUrl, title } = trackItem;

    return (
        <div className="flex-shrink-0 w-40 h-40 mr-4">
            <img src={imgUrl} alt="" className="w-full h-full object-cover" />
            <div className="mt-1">{title}</div>
        </div>
    );
};

const AutoScrollTrack: React.FC<{
    trackItems: { imgUrl: string; title: string }[];
}> = ({ trackItems }) => {
    return (
        <div
            id="image-track-wrapper"
            className="w-full h-48 border-2 border-red-500"
        >
            <div id="image-track">
                {trackItems.map((trackItem, index) => (
                    <TrackItem key={index} trackItem={trackItem} />
                ))}
            </div>
        </div>
    );
};

export default AutoScrollTrack;
