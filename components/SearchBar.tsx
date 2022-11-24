// import { useState } from 'react';
import SearchIcon from 'public/icons/search.svg';
import { useContext, useEffect, useMemo, useState } from 'react';
import { FiltersContext } from '../context/FiltersContext';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

const getSearchFromPathname = (pathname: string | null) => {
    if (!pathname) {
        return null;
    }

    const match = pathname.match(/\/search\/(.*)/);
    return match ? match[1] : null;
};

// eslint-disable-next-line @typescript-eslint/ban-types
const debounce = <T extends Function>(func: T, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return ((...args: unknown[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    }) as unknown as T;
};

const Search: React.FC = () => {
    const router = useRouter();
    const { search, setSearch } = useContext(FiltersContext);
    const [searchValue, setSearchValue] = useState(search);
    const pathName = usePathname();

    useEffect(() => {
        const searchFromPath = getSearchFromPathname(pathName);
        if (searchFromPath) {
            setSearch(searchFromPath);
            setSearchValue(searchFromPath);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!searchValue) {
            router.push('/');
            return;
        }

        router.push(`/search/${searchValue}`, undefined, { shallow: true });
    };

    const debouncedSetSearch = useMemo(() => debounce(setSearch, 500), []);

    return (
        <form onSubmit={handleSearch}>
            <div className="ml-6 md:ml-8 flex gap-4 md:gap-2">
                <input
                    className="rounded-md border border-gray-300 px-2 py-1"
                    type="text"
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        debouncedSetSearch(e.target.value)
                    }}
                />
                <button type="submit">
                    <SearchIcon alt="search" />
                </button>
            </div>
        </form>
    );
};

export default Search;
