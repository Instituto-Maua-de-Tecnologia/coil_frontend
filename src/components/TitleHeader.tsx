interface TitleHeaderProps {
    title: string;
    className: string;
}

export default function TitleHeader({ title, className }: TitleHeaderProps) {
    return (
        <div className={`${className} mx-auto mt-4 h-[84px] `}>
            <div className="h-[84px] top-0 left-0">
                <div className="relative  mx-auto h-[84px] bg-[#2684ff] rounded-[24px]">
                    <div className="absolute top-[20px] left-[50px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#f9fafc] text-[36px] tracking-[-1.08px] leading-[normal]">
                        {title}
                    </div>
                </div>
            </div>
        </div>
    );
}
