import "./App.css";
import SearchBar from "./components/Search";

function App() {
    const handleSearch = (searchTerm: string) => {
        console.log(searchTerm);
    };

    return (
        <>
            <SearchBar onSearch={handleSearch} />
        </>
    );
}

export default App;
