import TitleHeader from "@components/GenericComponents/TitleHeader";
import SideBar from "@components/GenericComponents/SideBar";
import ResultList from "@components/Result/ResultList";
import { ResultProps } from "@constants/ResultListProperties";

export default function Results() {
    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Results"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    <ResultList results={ResultProps} />
                </div>
            </div>
        </>
    );
}
