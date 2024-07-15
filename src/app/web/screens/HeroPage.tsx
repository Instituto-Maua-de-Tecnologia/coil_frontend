import Hero from "@components/Hero/Hero.tsx";
import CarouselComponent from "@components/Hero/Carousel.tsx";
import "@styles/hero.css";
import Footer from "@components/Hero/Footer.tsx";
import "@styles/scrollbar.css";

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
