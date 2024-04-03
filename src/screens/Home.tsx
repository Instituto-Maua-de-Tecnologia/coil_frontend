import CarouselComponent from "../components/Carousel.tsx";
import ProjectList from "../components/ProjectList.tsx";
import TitleHeader from "../components/TitleHeader.tsx";
import SideBar from "../components/SideBar.tsx";

export default function Home() {
    return (
        <>
            <TitleHeader title={"Home"} className={""} />
            <div className="flex flex-row">
                <SideBar />
                <div className="pl-[2.5rem] overflow-hidden">
                    <ProjectList />
                    <CarouselComponent />
                </div>
            </div>
        </>
    );
}
