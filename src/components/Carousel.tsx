import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Pagination, FreeMode } from "swiper/modules";
import { ServiceData } from "../constants/CarouselProperties.ts";

export default function CarouselComponent() {
    return (
        <div className={"flex items-center justify-center flex-col h-screen"}>
            <Swiper
                breakpoints={{
                    340: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    700: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    }
                }}
                freeMode={true}
                pagination={{
                    clickable: true
                }}
                modules={[FreeMode, Pagination]}
                className={"max-w-[90%] lg:max-w-[80%]"}
            >
                {ServiceData.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="w-[328px] mb-20 h-[395px]">
                            <div className="fixed w-[332px] h-[395px] top-0 left-0">
                                <div className="relative w-[328px] h-[395px] bg-white rounded-[63px] border-b-[21px] [border-bottom-style:solid] border-[#673366]">
                                    <img
                                        className="absolute ms-8 mt-2 w-[69px] h-[69px] top-0 left-[2px]"
                                        alt="Icon"
                                        src={item.profilePhoto}
                                    />
                                    <div className="absolute ms-8 w-[202px] top-[24px] left-[86px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-black text-[27px] tracking-[-0.81px] leading-[normal] whitespace-nowrap">
                                        {item.title}
                                    </div>
                                    <p className="absolute w-[278px] top-[88px] left-[20px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[21px] tracking-[0] leading-[normal]">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
