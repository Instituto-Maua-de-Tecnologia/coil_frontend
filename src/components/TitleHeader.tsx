interface TitleHeaderProps {
    title: string;
}

export default function TitleHeader({ title }: TitleHeaderProps) {
    return (
        <div className="w-full mx-auto mt-4 h-[84px]">
            <div className="w-full h-[84px] top-0 left-0">
                <div className="relative w-[95%] mx-auto h-[84px] bg-[#2684ff] rounded-[24px]">
                    <div className="absolute top-[20px] left-[50px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#f9fafc] text-[36px] tracking-[-1.08px] leading-[normal]">
                        {title}
                    </div>
                </div>
            </div>
        </div>
    );
}
