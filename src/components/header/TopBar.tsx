import SearchBar from "./SearchBar";

const TopBar = () => {
    return (
        <div className="flex bg-amber-100 p-8 justify-between">
            <p>Linis's Archives</p>
            <SearchBar/>
        </div>
    )
}

export default TopBar;