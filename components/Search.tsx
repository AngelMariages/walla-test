'use client';

import { useState } from 'react';
import SearchIcon from 'public/icons/search.svg';
import { useRouter } from 'next/navigation';

const Search: React.FC = () => {
    const router = useRouter();
    const [search, setSearch] = useState('');

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        // Navigate to the search page with next/router
        e.preventDefault();

		router.push(`/search?query=${search}`);
    };

    return (
        <form onSubmit={handleSearch}>
            <div className="ml-8 flex gap-2">
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
