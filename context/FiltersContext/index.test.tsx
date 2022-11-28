import { act, getByTestId, render } from '@testing-library/react';
import { useContext } from 'react';
import { FiltersContext, FiltersContextProvider } from '.';

describe('FiltersContext', () => {
    it('should set search to "test" when setSearch is called', async () => {
        const TestComponent = () => {
            const { setSearch, search } = useContext(FiltersContext);
            return (
                <>
                    <button
                        data-testid="set-search-btn"
                        onClick={() => setSearch('test')}>
                        Set Search
                    </button>
                    <div data-testid="search">{search}</div>
                </>
            );
        };
        const { container } = render(
            <FiltersContextProvider>
                <TestComponent />
            </FiltersContextProvider>
        );
        const setSearchButton = getByTestId(container, 'set-search-btn');
        const search = getByTestId(container, 'search');

        expect(search.textContent).toBe('');

        await act(() => {
            setSearchButton.click();
        });
        expect(search.textContent).toBe('test');
    });

    it('should set sort to "price" when setSort is called', async () => {
        const TestComponent = () => {
            const { setSort, sort } = useContext(FiltersContext);
            return (
                <>
                    <button
                        data-testid="set-sort-btn"
                        onClick={() => setSort('price')}>
                        Set Sort
                    </button>
                    <div data-testid="sort">{sort.sortBy}</div>
                </>
            );
        };
        const { container } = render(
            <FiltersContextProvider>
                <TestComponent />
            </FiltersContextProvider>
        );
        const setSortButton = getByTestId(container, 'set-sort-btn');
        const sort = getByTestId(container, 'sort');

        expect(sort.textContent).toBe('title');

        await act(() => {
            setSortButton.click();
        });
        expect(sort.textContent).toBe('price');
    });

    it('should invert sort order when setSort is called with same sort', async () => {
        const TestComponent = () => {
            const { setSort, sort } = useContext(FiltersContext);
            return (
                <>
                    <button
                        data-testid="set-sort-btn"
                        onClick={() => setSort('price')}>
                        Set Sort
                    </button>
                    <div data-testid="sort">{sort.sortBy}</div>
                    <div data-testid="sort-order">{sort.sortOrder}</div>
                </>
            );
        };

        const { container } = render(
            <FiltersContextProvider>
                <TestComponent />
            </FiltersContextProvider>
        );

        const setSortButton = getByTestId(container, 'set-sort-btn');
        const sort = getByTestId(container, 'sort');
        const sortOrder = getByTestId(container, 'sort-order');

        expect(sort.textContent).toBe('title');
        expect(sortOrder.textContent).toBe('asc');

        await act(() => {
            setSortButton.click();
        });

        expect(sort.textContent).toBe('price');
        expect(sortOrder.textContent).toBe('asc');

        await act(() => {
            setSortButton.click();
        });

        expect(sort.textContent).toBe('price');
        expect(sortOrder.textContent).toBe('desc');
    });

    it('should set page to 2 when incrementPage is called', async () => {
        const TestComponent = () => {
            const { incrementPage, page } = useContext(FiltersContext);
            return (
                <>
                    <button
                        data-testid="increment-page-btn"
                        onClick={incrementPage}>
                        Increment Page
                    </button>
                    <div data-testid="page">{page}</div>
                </>
            );
        };
        const { container } = render(
            <FiltersContextProvider>
                <TestComponent />
            </FiltersContextProvider>
        );
        const incrementPageButton = getByTestId(
            container,
            'increment-page-btn'
        );
        const page = getByTestId(container, 'page');

        expect(page.textContent).toBe('1');

        await act(() => {
            incrementPageButton.click();
        });

        expect(page.textContent).toBe('2');
    });
});
