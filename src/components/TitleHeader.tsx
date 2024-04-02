interface TitleHeaderProps {
    title: string;
    className?: string;
}

export default function TitleHeader({ title, className }: TitleHeaderProps) {
    return (
        <div className={`${className} mx-[1rem] mt-4 max-h-[64px] mb-[1rem]`}>
            <div className="h-[64px] top-0 left-0">
                <div className="relative  mx-auto h-[64px] bg-[#2684ff] rounded-[24px]">
                    <div className="absolute top-[16px] left-[50px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#f9fafc] text-[30px] tracking-[-1.08px] leading-[normal]">
                        {title}
                    </div>
                </div>
            </div>
        </div>
    );
}
