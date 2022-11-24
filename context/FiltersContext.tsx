import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useCallback,
    useState,
} from 'react';

export type Sort = {
    sortBy: 'price' | 'title' | 'description' | 'email';
    sortOrder: 'asc' | 'desc';
};

type FiltersContextType = {
    page: number;
    incrementPage: () => void;
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    sort: Sort;
    setSort: Dispatch<SetStateAction<Sort>>;
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
    setSort: (prevState: SetStateAction<Sort>) => prevState,
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
                    setSort(value);
                },
            }}>
            {children}
        </FiltersContext.Provider>
    );
};

export { FiltersContext, FiltersContextProvider };
