interface TitleHeaderProps {
    title: string;
}

export default function TitleHeader({ title }: TitleHeaderProps) {
    return (
        <div className="w-[1861px] mx-auto mt-4 h-[84px]">
            <div className="w-[1863px] h-[84px] top-0 left-0">
                <div className="relative w-[1861px] h-[84px] bg-[#2684ff] rounded-[24px]">
                    <div className="absolute top-[20px] left-[50px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#f9fafc] text-[36px] tracking-[-1.08px] leading-[normal]">
                        {title}
                    </div>
                </div>
            </div>
        </div>
    );
}
