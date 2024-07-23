import ModalImage from "./ModalImage.tsx";
import { useState } from "react";

interface ImageWithModalProps {
    image: string;
    index: number;
}

export default function ImageWithModal({ image, index }: ImageWithModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <img
                key={"Institution image: " + index}
                src={image}
                className="!rounded-2xl transform hover:-translate-y-0.5 w-52 transition-transform duration-300 drop-shadow-md object-cont max-w-full max-h-full cursor-zoom-in"
                alt={"image"}
                onClick={handleOpenModal}
            />
            <ModalImage
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                imageSrc={image}
            />
        </div>
    );
}
