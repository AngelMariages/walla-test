import WallapopLogo from 'public/images/logo-wallapop.svg';
import FavIcon from 'public/icons/fav.svg';
import Search from './SearchBar';
import Link from 'next/link';
import { useContext } from 'react';
import { FiltersContext } from '../context/FiltersContext';
import SortByBar from './SortByBar';

const FavButton = () => {
    return (
        <>
            <button
                className={
                    `fixed bottom-8 right-8 z-10 bg-gray-400  border border-gray-500 shadow-xl shadow-gray-700 rounded-full w-14 h-14 text-center justify-end items-center` +
                    ` md:static md:flex md:flex-row md:h-full md:bg-transparent md:border-none md:shadow-none`
                }>
                <FavIcon className="w-[32px] mx-auto" alt="fav" />
            </button>
        </>
    );
};

const Header = () => {
    const { setSearch } = useContext(FiltersContext);

    return (
        <>
            <header className="flex sticky top-0 z-10 justify-between items-center w-full h-20 sm:h-24 px-6 sm:px-8 bg-gray-100">
                <div className="flex flex-row justify-start items-center h-full">
                    <Link
                        href="/"
                        className="w-[104px]"
                        onClick={() => setSearch('')}>
                        <WallapopLogo className="w-[104px]" alt="logo" />
                    </Link>
                    <Search />
                </div>
                <FavButton />
            </header>
            <SortByBar />
        </>
    );
};

export default Header;
