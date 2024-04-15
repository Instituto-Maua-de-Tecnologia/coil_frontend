interface TitleHeaderProps {
    title: string;
    className?: string;
}

export default function TitleHeader({ title, className }: TitleHeaderProps) {
    return (
        <div className={`${className} max-h-[64px] mb-[1rem]`}>
            <div className="h-[64px] top-0 left-0">
                <div className="relative mx-auto min-h-[64px] bg-[#2684ff] rounded-[24px]">
                    <div className="absolute flex flex-row items-center top-[16px] left-[20px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#f9fafc] 2xs:text-[28px] lg:text-[30px] tracking-[-1.08px] leading-[normal] ml-[1rem]">
                        <div className="lg:hidden pr-[1rem]">
                            <svg
                                className="w-[2rem]"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </div>
                        {title}
                    </div>
                </div>
            </div>
        </div>
    );
}
