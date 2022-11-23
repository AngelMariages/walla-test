import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useState,
} from 'react';

type Sort = {
    sortBy: 'price' | 'title' | 'description' | 'email';
    sortOrder: 'asc' | 'desc';
};

type FiltersContextType = {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    sortBy: Sort['sortBy'];
    sortDirection: Sort['sortOrder'];
    setSort: Dispatch<SetStateAction<Sort>>;
};

const FiltersContext = createContext<FiltersContextType>({
    page: 1,
    setPage: (prevState: SetStateAction<number>) => prevState,
    search: '',
    setSearch: (prevState: SetStateAction<string>) => prevState,
    sortBy: 'title',
    sortDirection: 'asc',
    setSort: (prevState: SetStateAction<Sort>) => prevState,
});

type Props = {
    overridenSearch?: string;
};

const FiltersContextProvider: React.FC<PropsWithChildren<Props>> = ({ overridenSearch, children }) => {
    const [search, setSearch] = useState(overridenSearch || '');
    const [sort, setSort] = useState<Sort>({
        sortBy: 'title',
        sortOrder: 'asc',
    });
    const [page, setPage] = useState(1);

    return (
        <FiltersContext.Provider
            value={{
                page,
                setPage,
                search,
                setSearch: (value) => {
                    setPage(1);
                    setSearch(value);
                },
                sortBy: sort.sortBy,
                sortDirection: sort.sortOrder,
                setSort,
            }}>
            {children}
        </FiltersContext.Provider>
    );
};

export { FiltersContext, FiltersContextProvider };
