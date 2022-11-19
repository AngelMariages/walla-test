import WallapopLogo from 'public/images/logo-wallapop.svg';
import FavIcon from 'public/icons/fav.svg';
import Search from './Search';
import Link from 'next/link';

const Logo = () => (
    <div>
        <WallapopLogo alt="logo" />
    </div>
);
const FavButton = () => {
    return (
        <button className="w-8">
            <FavIcon alt="fav" />
        </button>
    );
};

const Header = () => {
    return (
        <header className="flex flex-row justify-between items-center w-full h-24 px-8 bg-gray-100">
            <div className="flex flex-row justify-start items-center h-full">
                <Link href="/">
                    <Logo />
                </Link>
                <Search />
            </div>
            <div className="flex flex-row justify-end items-center h-full">
                <FavButton />
            </div>
        </header>
    );
};

export default Header;
