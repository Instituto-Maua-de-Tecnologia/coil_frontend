import React from "react";

interface SVGIconProps {
    src: string;
    alt?: string;
    className?: string;
    width?: number;
    height?: number;
}

const SVGIcon: React.FC<SVGIconProps> = ({ src, alt = "", className = "" }) => {
    return <img src={src} alt={alt} className={` ${className}`} />;
};

export default SVGIcon;
