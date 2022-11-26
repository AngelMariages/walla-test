import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useCallback,
    useState,
} from 'react';
import { Sort } from '../constants/sortBy';

type FiltersContextType = {
    page: number;
    incrementPage: () => void;
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    sort: Sort;
    setSort: (newSort: Sort['sortBy']) => void;
};

const FiltersContext = createContext<FiltersContextType>({
    page: 1,
    incrementPage: () => 0,
    search: '',
    setSearch: (prevState: SetStateAction<string>) => prevState,
    sort: {
        sortBy: 'title',
        sortOrder: 'asc',
    },
    setSort: () => false,
});

type Props = {
    overridenSearch?: string;
};

const FiltersContextProvider: React.FC<PropsWithChildren<Props>> = ({
    overridenSearch,
    children,
}) => {
    const [search, setSearch] = useState(overridenSearch || '');
    const [sort, setSort] = useState<Sort>({
        sortBy: 'title',
        sortOrder: 'asc',
    });
    const [page, setPage] = useState(1);
    const incrementPage = useCallback(() => {
        setPage((prev) => prev + 1);
    }, []);

    const getSortOrder = useCallback(
        (newSort: Sort['sortBy']) => {
            if (newSort === sort.sortBy) {
                return sort.sortOrder === 'asc' ? 'desc' : 'asc';
            }

            return 'asc';
        },
        [sort.sortBy, sort.sortOrder]
    );

    return (
        <FiltersContext.Provider
            value={{
                page,
                incrementPage,
                search,
                setSearch: (value) => {
                    setPage(1);
                    setSearch(value);
                },
                sort,
                setSort: (value) => {
                    setPage(1);
                    const sortOrder = getSortOrder(value);

                    setSort({
                        sortBy: value,
                        sortOrder,
                    });
                },
            }}>
            {children}
        </FiltersContext.Provider>
    );
};

export { FiltersContext, FiltersContextProvider };
