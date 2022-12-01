import { useContext, useEffect, useRef } from 'react';
import { FiltersContext } from 'context/FiltersContext';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import SearchBarItem from 'components/SearchBar';

const getSearchFromPathname = (pathname: string | null) => {
    if (!pathname) {
        return null;
    }

    const match = pathname.match(/\/search\/(.*)/);
    return match ? match[1] : null;
};

const HeaderSearchBar: React.FC = () => {
    const router = useRouter();
    const { setSearch } = useContext(FiltersContext);
    const pathName = usePathname();
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const searchFromPath = getSearchFromPathname(pathName);
        if (searchFromPath) {
            setSearch(searchFromPath);
            if (searchRef.current) {
                searchRef.current.value = searchFromPath;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!searchRef.current?.value) {
            router.push('/');
            return;
        }

        router.push(`/search/${searchRef.current.value}`, undefined, {
            shallow: true,
        });
    };

    return (
        <SearchBarItem
            setSearch={setSearch}
            onSubmit={handleSearch}
            ref={searchRef}
        />
    );
};

export default HeaderSearchBar;
