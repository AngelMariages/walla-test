import { debounce } from 'lib/debounce';
import { forwardRef, useMemo } from 'react';
import SearchIcon from 'public/icons/search.svg';

type Props = {
    setSearch: (search: string) => void;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default forwardRef<HTMLInputElement, Props>(function SearchBar(
    { setSearch, onSubmit },
    searchRef
) {
    const debouncedSetSearch = useMemo(
        () => debounce(setSearch, 500),
        [setSearch]
    );

    return (
        <form onSubmit={onSubmit} data-testid="search-form">
            <div className="ml-4 md:ml-8 flex gap-2 md:gap-4">
                <input
                    data-testid="search-input"
                    ref={searchRef}
                    className="rounded-md border border-gray-300 px-2 py-1"
                    type="text"
                    placeholder="Search"
                    onChange={(e) => {
                        debouncedSetSearch(e.target.value);
                    }}
                />
                <button type="submit" className="ml-2">
                    <SearchIcon alt="search" />
                </button>
            </div>
        </form>
    );
});
