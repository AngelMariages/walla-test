import WallapopLogo from 'public/images/logo-wallapop.svg';
import FavIcon from 'public/icons/fav.svg';
import SearchBar from 'components/SearchBar';
import Link from 'next/link';
import { useContext } from 'react';
import { FiltersContext } from 'context/FiltersContext';
import { FavoritesContext } from 'context/FavoritesContext';

const FavButton: React.FC<{
    onClick: () => void;
}> = ({ onClick, ...props }) => {
    return (
        <button
            onClick={onClick}
            className={
                `fixed bottom-8 right-8 z-10 bg-gray-400 rounded-full ring-5 shadow-xl shadow-gray-700 w-14 h-14 text-center justify-end items-center` +
                ` md:static md:flex md:flex-row md:h-full md:bg-transparent md:border-none md:shadow-none`
            }
            {...props}>
            <FavIcon className="w-[32px] fill-red-500 mx-auto" alt="fav" />
        </button>
    );
};

const Header = () => {
    const { setSearch } = useContext(FiltersContext);
    const { toggleFavorites } = useContext(FavoritesContext);

    return (
        <header className="flex sticky top-0 z-10 justify-between items-center w-full h-20 sm:h-24 px-6 sm:px-8 bg-gray-100">
            <div className="flex flex-row justify-start items-center h-full">
                <Link
                    href="/"
                    className="w-[104px]"
                    data-testid="logo"
                    onClick={() => setSearch('')}>
                    <WallapopLogo className="w-[104px]" alt="logo" />
                </Link>
                <SearchBar />
            </div>
            <FavButton data-testid="favbutton" onClick={toggleFavorites} />
        </header>
    );
};

export default Header;
