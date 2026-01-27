import SearchBar from "./SearchBar";

const TopBar = () => {
    return (
        <div className="flex bg-sky-950 p-8 justify-between text-slate-200">
            <p>Linis's Archives</p>
            <SearchBar/>
        </div>
    )
}

export default TopBar;