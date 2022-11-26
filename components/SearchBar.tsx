import SearchIcon from 'public/icons/search.svg';
import { useContext, useEffect, useMemo, useRef } from 'react';
import { FiltersContext } from 'context/FiltersContext';
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
    }, [])

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!searchRef.current?.value) {
            router.push('/');
            return;
        }

        router.push(`/search/${searchRef.current.value}`, undefined, { shallow: true });
    };

    const debouncedSetSearch = useMemo(() => debounce(setSearch, 500), [setSearch]);

    return (
        <form onSubmit={handleSearch}>
            <div className="ml-4 md:ml-8 flex gap-2 md:gap-4">
                <input
                    ref={searchRef}
                    className="rounded-md border border-gray-300 px-2 py-1"
                    type="text"
                    placeholder="Search"
                    onChange={(e) => {
                        debouncedSetSearch(e.target.value)
                    }}
                />
                <button type="submit" className='ml-2'>
                    <SearchIcon alt="search" />
                </button>
            </div>
        </form>
    );
};

export default Search;
