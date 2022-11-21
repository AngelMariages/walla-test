import WallapopLogo from 'public/images/logo-wallapop.svg';
import FavIcon from 'public/icons/fav.svg';
import Search from './SearchBar';
import Link from 'next/link';

const FavButton = () => {
    return (
        <button
            className={
                `fixed bottom-8 right-8 z-10 bg-black rounded-full w-14 h-14 text-center` +
                ` md:flex flex-row justify-end items-center md:h-full`
            }>
            <FavIcon className='w-[32px] mx-auto' alt="fav" />
        </button>
    );
};

const Header = () => {
    return (
        <header className="sticky z-10 flex flex-row justify-between items-center w-full h-20 sm:h-24 px-6 sm:px-8 bg-gray-100">
            <div className="flex flex-row justify-start items-center h-full">
                <Link href="/" className="w-[104px]">
                    <WallapopLogo className="w-[104px]" alt="logo" />
                </Link>
                <Search />
            </div>
            <FavButton />
        </header>
    );
};

export default Header;
