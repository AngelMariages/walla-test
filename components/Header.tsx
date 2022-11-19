const Logo = () => (
    <img
        src="https://es.wallapop.com/assets/images/logo-wallapop-home-v2.svg"
        alt="logo"
    />
);
const SearchBar = () => {
    return (
        <div className="ml-8">
            <input
                className="rounded-md border border-gray-300 px-2 py-1"
                type="text"
                placeholder="Search"
            />
        </div>
    );
};
const FavButton = () => {
    return (
        <button className="w-8">
            <img src="/icons/fav.svg" alt="fav" />
        </button>
    );
};

const Header = () => {
    return (
        <header className="flex flex-row justify-between items-center w-full h-24 px-8 bg-gray-100">
            <div className="flex flex-row justify-start items-center w-1/2 h-full">
                <Logo />
                <SearchBar />
            </div>
            <div className="flex flex-row justify-end items-center w-1/2 h-full">
                <FavButton />
            </div>
        </header>
    );
};

export default Header;
