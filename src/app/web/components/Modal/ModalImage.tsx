import React, { useEffect, useState } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
}

export default function ModalImage({ isOpen, onClose, imageSrc }: ModalProps) {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        } else {
            setIsAnimating(false);
        }
    }, [isOpen]);

    const handleClickOutside = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            onClick={handleClickOutside}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
            <div className="relative p-4 max-w-screen max-h-screen">
                <img
                    src={imageSrc}
                    alt="Expanded view"
                    className={`max-w-full max-h-full rounded transform transition-transform duration-500 ${isAnimating ? "scale-100" : "scale-0"}`}
                />
            </div>
        </div>
    );
}
