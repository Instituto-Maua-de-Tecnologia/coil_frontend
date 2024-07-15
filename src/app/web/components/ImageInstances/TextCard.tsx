export default function TextCard({
    className,
    color,
    titleText,
    contentText
}: {
    className?: string;
    titleText?: string;
    contentText?: string;
    color?: string;
}) {
    return (
        <div
            className={`relative ${className} ${color} rounded-[63px] border-b-[11px] p-10 [border-bottom-style:solid] border-[#673366] overflow-clip`}
        >
            <h1 className="font-bold text-3xl pb-2">{titleText}</h1>
            <p>{contentText}</p>
        </div>
    );
}
