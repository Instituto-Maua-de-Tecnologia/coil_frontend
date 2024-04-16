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

export default TrackItem;
