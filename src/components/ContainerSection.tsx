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
        <div className={`${className} bg-white rounded-3xl p-[1rem]`}>
            <h1
                className={`${titleClassName} font-bold text-[2rem] text-title `}
            >
                {title}
            </h1>
            <div className="">{description}</div>
            {children}
        </div>
    );
}
