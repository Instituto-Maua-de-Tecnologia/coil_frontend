import React from "react";
import "@styles/hero.css";

interface TrackItemProps {
    trackItem: { imgUrl: string; title: string };
}

const TrackItem: React.FC<TrackItemProps> = ({ trackItem }) => {
    const { imgUrl } = trackItem;

    return (
        <div className="w-32 h-32 sm:w-16 sm:h-16 lg:w-24 lg:h-24 mx-4 lg:mx-8 md:mx-5 ">
            <img
                src={imgUrl}
                alt=""
                className="w-full h-full object-cover drop-shadow-lg rounded-full"
            />
        </div>
    );
};

export default TrackItem;
