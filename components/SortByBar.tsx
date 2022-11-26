import { useContext } from 'react';
import { Sort, sortBys } from '../constants/sortBy';
import { FiltersContext } from '../context/FiltersContext';
import UpArrow from 'public/icons/arrow-up.svg';
import DownArrow from 'public/icons/arrow-down.svg';

type SortArrowProps = {
    sortOrder: Sort['sortOrder'];
    className?: string;
};

const SortArrow: React.FC<SortArrowProps> = ({ sortOrder, className }) => {
    if (sortOrder === 'asc') {
        return <UpArrow className={className} />;
    } else {
        return <DownArrow className={className} />;
    }
};

const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const SortByBar = () => {
    const { setSort, sort } = useContext(FiltersContext);

    return (
        <div className="flex flex-row py-4 px-4 justify-center">
            <div className="flex flex-row pl-4 gap-4 text-white">
                {sortBys.map((sortBy) => (
                    <button
                        key={sortBy}
                        className="px-3 md:px-4 rounded-lg bg-[#12C1AC] flex flex-row items-center"
                        onClick={() => {
                            setSort(sortBy);
                        }}>
                        {capitalizeFirstLetter(sortBy)}
                        {sort.sortBy === sortBy && (
                            <SortArrow
                                sortOrder={sort.sortOrder}
                                className="ml-2 w-4 h-4"
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SortByBar;
