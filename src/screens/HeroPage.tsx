import Hero from "@components/Hero/Hero";
import CarouselComponent from "@components/Hero/Carousel";
import "@style/hero.css";
import Footer from "@components/Hero/Footer";
import "@style/scrollbar.css";

export default function HeroPage() {
    return (
        <div className="bg-white">
            <Hero />
            <div className="mt-10 w-full h-auto blue-purple-gradient rounded-t-[62px]">
                <CarouselComponent />
            </div>
            <Footer />
        </div>
    );
}
