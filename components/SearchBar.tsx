'use client';

import { useState } from 'react';
import SearchIcon from 'public/icons/search.svg';
import { usePathname, useRouter } from 'next/navigation';

const getSearchFromPathname = (pathname: string | null) => {
    if (!pathname) {
        return '';
    }

    const match = pathname.match(/\/search\/(.*)/);
    return match ? match[1] : '';
};

const Search: React.FC = () => {
    const router = useRouter();
    const pathName = usePathname();
    const [search, setSearch] = useState(getSearchFromPathname(pathName));

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!search) {
            router.push('/', {
                forceOptimisticNavigation: true,
            });
            return;
        }

        router.push(`/search/${search}`, {
            forceOptimisticNavigation: true,
        });
    };

    return (
        <form onSubmit={handleSearch}>
            <div className="ml-6 md:ml-8 flex gap-4 md:gap-2">
                <input
                    className="rounded-md border border-gray-300 px-2 py-1"
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">
                    <SearchIcon alt="search" />
                </button>
            </div>
        </form>
    );
};

export default Search;
