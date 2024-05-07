import ImageCard from "../ImageInstances/ImageCard";
import { HeroCardData } from "@constants/HeroCardProperties";

const HeroCard = () => {
    return (
        <div className="pb-80">
            <div className=" relative sm:hidden md:block rounded-r-[63px] lg:w-[70rem] md:w-[40rem] lg:h-[88rem] md:h-[50rem] bg-bcard">
                <div className="flex flex-row justify-between p-10">
                    <div className="text-white pt-24 px-4">
                        <h1 className="font-bold text-3xl pb-2">
                            {HeroCardData[0].title}
                        </h1>
                        <p className="">{HeroCardData[0].content}</p>
                    </div>
                    <div className="">
                        <ImageCard
                            className="lg:w-[40rem] lg:h-[23rem] md:w-[30rem] md:h-[17rem]"
                            image={HeroCardData[0].infoImage}
                        />
                    </div>
                </div>
                <div className="flex absolute flex-row justify-between right-0 bottom-0  p-10">
                    <div className="flex  ">
                        <div className="text-white pt-24 px-4">
                            <h1 className="font-bold text-3xl pb-2">
                                {HeroCardData[1].title}
                            </h1>
                            <p className="">{HeroCardData[1].content}</p>
                        </div>
                        <div className="">
                            <ImageCard
                                className="lg:w-[40rem] lg:h-[23rem] md:w-[30rem] md:h-[17rem]"
                                image={HeroCardData[1].infoImage}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative">
                <div className="absolute right-0 md:-top-[30rem] rounded-l-[63px] lg:-top-[59rem] lg:w-[65rem] lg:h-[30rem] md:w-[35rem] md:h-[20rem] bg-dbcard">
                    <div className="flex absolute flex-row justify-between right-0 bottom-0 p-14">
                        <div className="flex">
                            <div className="">
                                <ImageCard
                                    className="lg:w-[40rem] lg:h-[23rem] md:w-[30rem] md:h-[17rem]"
                                    image={HeroCardData[2].infoImage}
                                />
                            </div>
                            <div className="text-white pt-24 px-4">
                                <h1 className="font-bold text-3xl pb-2">
                                    {HeroCardData[2].title}
                                </h1>
                                <p className="">{HeroCardData[2].content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroCard;
