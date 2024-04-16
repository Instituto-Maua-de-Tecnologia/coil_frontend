import React from "react";
import "@style/hero.css";

interface TrackItemProps {
    trackItem: { imgUrl: string; title: string };
}

const TrackItem: React.FC<TrackItemProps> = ({ trackItem }) => {
    const { imgUrl } = trackItem;

    return (
        <div className="w-16 h-16 lg:w-24 lg:h-24 mx-4 lg:mx-8 md:mx-5 ">
            <img
                src={imgUrl}
                alt=""
                className="w-full h-full object-cover rounded-full"
            />
        </div>
    );
};

export default TrackItem;
