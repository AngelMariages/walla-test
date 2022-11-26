import { useContext } from 'react';
import { sortBys } from '../constants/sortBy';
import { FiltersContext } from '../context/FiltersContext';

const SortByBar = () => {
    const { setSort } = useContext(FiltersContext);

    return (
        <div className="flex flex-row py-4 px-4 justify-center">
            Sort by:
            <div className="flex flex-row pl-4 gap-4 text-white">
                {sortBys.map((sortBy) => (
                    <button
                        key={sortBy}
                        className="px-4 rounded-lg bg-[#12C1AC]"
                        onClick={() => {
                            setSort(sortBy);
                        }}>
                        {sortBy}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SortByBar;
