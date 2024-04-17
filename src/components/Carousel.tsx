import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import SwiperInstance from "swiper";
import { Pagination, FreeMode, Navigation, Autoplay } from "swiper/modules";
import { ServiceData } from "@constants/CarouselProperties.ts";
import { useEffect, useState } from "react";
import chevronLeft from "@assets/chevronLeft.png";
import chevronRight from "@assets/chevronRight.png";

export default function CarouselComponent() {
    const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 500px)");
        setIsSmallScreen(mediaQuery.matches);

        const handleResize = (e: MediaQueryListEvent) => {
            setIsSmallScreen(e.matches);
        };
        mediaQuery.addEventListener("change", handleResize);
        return () => {
            mediaQuery.removeEventListener("change", handleResize);
        };
    }, []);

    const goNext = () => {
        if (swiper) {
            swiper.slideNext();
        }
    };

    const goPrev = () => {
        if (swiper) {
            swiper.slidePrev();
        }
    };

    return (
        <div className={"flex items-center justify-center flex-col h-screen"}>
            <Swiper
                loop={true}
                autoplay={{
                    delay: 7000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false
                }}
                breakpoints={{
                    340: {
                        slidesPerView: 1,
                        spaceBetween: 15
                    },
                    780: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    1520: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    }
                }}
                freeMode={false}
                pagination={{
                    clickable: true
                }}
                onSwiper={setSwiper}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                className={"max-w-[90%] lg:max-w-[80%]"}
            >
                {ServiceData.map((item, index) => (
                    <SwiperSlide key={index} className={""}>
                        <div className="w-[20.5em] mb-20 h-[395px]">
                            <div className="fixed w-full h-[395px] top-0 left-0">
                                <div className="relative mx-auto max-w-[20.5em] h-[395px] bg-white rounded-[63px] border-b-[21px] [border-bottom-style:solid] border-[#673366]">
                                    <img
                                        className="absolute ms-8 mt-2 w-[69px] h-[69px] top-0 left-[2px]"
                                        alt="Icon"
                                        src={item.profilePhoto}
                                    />
                                    <h1 className="absolute text-wrap break-words w-full top-[24px] left-[118px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-black text-[27px] tracking-[-0.81px] leading-[normal]">
                                        {item.title}
                                    </h1>
                                    <p className="absolute text-wrap break-words w-full top-[88px] left-[20px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[21px] tracking-[0] leading-[normal]">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {isSmallScreen && (
                <>
                    <button
                        className="swiper-button-prev bg-transparent absolute left-4 transform -translate-y-1/2 p-2 z-10"
                        onClick={goPrev}
                    >
                        <img src={chevronLeft} alt={"chevronLeft"} />
                    </button>
                    <button
                        className="swiper-button-next bg-transparent absolute right-4 transform -translate-y-1/2 p-2 z-10"
                        onClick={goNext}
                    >
                        <img src={chevronRight} alt={"chevronRight"} />
                    </button>
                </>
            )}
        </div>
    );
}
