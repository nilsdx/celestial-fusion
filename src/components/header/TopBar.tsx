import SearchBar from "./SearchBar";

const TopBar = () => {
    return (
        <div className="flex items-center bg-sky-950 px-8 py-2 justify-between text-slate-200">
            <p>Celestial Fusion</p>
            <SearchBar/>
        </div>
    )
}

export default TopBar;