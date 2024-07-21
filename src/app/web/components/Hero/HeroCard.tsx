import TextCard from "@components/ImageInstances/TextCard";
import ImageCard from "../ImageInstances/ImageCard";
import { HeroCardData } from "@constants/HeroCardProperties";

const HeroCard = () => {
    return (
        <div className="mt-7 ">
            <div className="lg:hidden flex flex-col items-center justify-center w-full">
                {HeroCardData.map((cardData, index) => (
                    <div
                        key={"MobileCardData: " + index}
                        className="text-white drop-shadow-lg pt-5 w-[80%]"
                    >
                        <TextCard
                            titleText={cardData.title}
                            contentText={cardData.content}
                            color={index === 1 ? "bg-dbcard" : "bg-bcard"}
                        />
                    </div>
                ))}
            </div>
            <div className=" relative 2xs:hidden lg:block rounded-r-[63px] lg:w-[50rem] md:w-[40rem] lg:h-[88rem] md:h-[50rem] bg-bcard ">
                <div className="flex flex-row justify-between p-10">
                    <div className="absolute drop-shadow-lg right-20 top-12">
                        <ImageCard
                            className="lg:w-[40rem] lg:h-[23rem] md:w-[30rem] md:h-[17rem]"
                            image={HeroCardData[0].infoImage}
                        />
                    </div>
                    <div className="absolute drop-shadow-lg -right-32 top-1 text-white pt-24 w-[50%] z-10">
                        <TextCard
                            titleText={HeroCardData[0].title}
                            contentText={HeroCardData[0].content}
                            color="bg-bcard"
                        />
                    </div>
                </div>
                <div className="flex  flex-row justify-between right-0 bottom-0  p-10">
                    <div className="flex flex-row justify-between p-10">
                        <div className="absolute drop-shadow-lg bottom-10 right-20">
                            <ImageCard
                                className="lg:w-[40rem] lg:h-[23rem] md:w-[30rem] md:h-[17rem]"
                                image={HeroCardData[1].infoImage}
                            />
                        </div>
                        <div className="absolute drop-shadow-lg -right-32 bottom-28 text-white pt-24  w-[50%] z-20">
                            <TextCard
                                titleText={HeroCardData[1].title}
                                contentText={HeroCardData[1].content}
                                color="bg-bcard"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative 2xs:hidden lg:block">
                <div className="absolute right-0 md:-top-[30rem] rounded-l-[63px] lg:-top-[59rem] lg:w-[50rem] lg:h-[30rem] md:w-[35rem] md:h-[20rem] bg-dbcard">
                    <div className="flex">
                        <div className="absolute drop-shadow-lg -left-60 bottom-24 w-[60%] z-20 text-white pt-24 px-4">
                            <TextCard
                                titleText={HeroCardData[2].title}
                                contentText={HeroCardData[2].content}
                                color="bg-dbcard"
                            />
                        </div>
                        <div className="absolute drop-shadow-lg bottom-12 left-12">
                            <ImageCard
                                className="lg:w-[40rem] lg:h-[23rem] md:w-[30rem] md:h-[17rem]"
                                image={HeroCardData[2].infoImage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroCard;
