import CarouselComponent from "../components/Carousel.tsx";
import ProjectList from "../components/ProjectList.tsx";

export default function Home() {
    return (
        <>
            <h1>You are in the Home page</h1>
            <CarouselComponent />
            <ProjectList />
        </>
    );
}
