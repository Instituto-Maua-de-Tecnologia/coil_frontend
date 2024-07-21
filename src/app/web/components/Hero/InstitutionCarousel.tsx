import TrackItem from "@components/GenericComponents/TrackItem";
import { ImageTrack } from "@components/ImageInstances/ImageTrack";
import HeroCard from "./HeroCard";
import ICatalog from "@interfaces/catalog/ICatalog.ts";
import { LoadSpinner } from "@components/GenericComponents/LoadSpinner.tsx";

interface InstitutionCarouselProps {
    loaded: boolean;
    catalog: ICatalog;
}

export default function InstitutionCarousel({
    loaded,
    catalog
}: InstitutionCarouselProps) {
    return (
        <>
            <div
                id="international-department"
                className="mt-10 md:mt-8 lg:mt-5 my-50 lg:my-48"
            >
                <h1 className="text-center mt-5 pt-5 mb-5 text-4xl lg:text-5xl font font-semibold hero-text my-2">
                    Our Partners
                </h1>
                {loaded ? (
                    <ImageTrack direction="right" speed={10} className="my-5">
                        {catalog.institutions.map((trackItem, index) => (
                            <TrackItem
                                key={"CatalogInstitution: " + index}
                                trackItem={{
                                    imgUrl: trackItem.images[index],
                                    title: trackItem.name
                                }}
                            />
                        ))}
                    </ImageTrack>
                ) : (
                    <div className="flex mt-[15%] fill-slate-500 justify-center items-center">
                        <LoadSpinner />
                    </div>
                )}
                <HeroCard />
            </div>
        </>
    );
}
