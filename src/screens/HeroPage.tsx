import Hero from "@components/Hero/Hero";
import CarouselComponent from "@components/Hero/Carousel";
import "@style/hero.css";
import Footer from "@components/Hero/Footer";
import HeroCard from "@components/Hero/HeroCard";
import InstitutionCarousel from "@components/Hero/InstitutionCarousel";
import "@style/scrollbar.css";
import OpenOpportunities from "@components/Hero/OpenOpportunities";

export default function HeroPage() {
    return (
        <div className="bg-white">
            <Hero />
            <InstitutionCarousel />
            <HeroCard />
            <OpenOpportunities />
            <div className="mt-10 w-full h-auto blue-purple-gradient rounded-t-[62px]">
                <CarouselComponent />
            </div>
            <Footer />
        </div>
    );
}
