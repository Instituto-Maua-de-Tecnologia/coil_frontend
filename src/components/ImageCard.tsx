export default function ImageCard({
    className = "w-[20.5em] h-[395px]",
    image
}: {
    className?: string;
    image?: string;
}) {
    return (
        <div
            className={`relative ${className} bg-white rounded-[63px] border-b-[11px] [border-bottom-style:solid] border-[#673366] overflow-clip`}
        >
            <img src={image} alt={image} />
        </div>
    );
}
