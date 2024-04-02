export default function ContainerSection({
    title = "Title",
    description = "",
    className = "",
    titleClassName = "",
    children
}: {
    title: string;
    description?: string;
    className?: string;
    titleClassName?: string;
    children?: JSX.Element;
}) {
    return (
        <div className={`${className} bg-sb-bg rounded-3xl p-[1rem]`}>
            <h1
                className={`${titleClassName}  2xs:text-[1.6rem] font-bold lg:text-[2rem] text-title `}
            >
                {title}
            </h1>
            <div className="2xs:pt-[1rem] lg:pt-[2rem]">{description}</div>
            {children}
        </div>
    );
}
