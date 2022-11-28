import { fireEvent, getByTestId } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { renderWithContext } from '__test__/utils';
import SortByBar from '.';

describe('SortByBar', () => {
    it('should render correctly', () => {
        const { container } = renderWithContext(<SortByBar />);
        expect(container).toMatchSnapshot();
    });

    it('should render correctly with asc', () => {
        const { container } = renderWithContext(<SortByBar />, {
            filtersContext: {
                sort: {
                    sortBy: 'title',
                    sortOrder: 'asc',
                },
            },
        });
        expect(container).toMatchSnapshot();

        const ascButton = getByTestId(container, 'sort-by-title-asc');

        expect(ascButton).toBeDefined();
    });

    it('should call setSort when button is clicked', async () => {
        const setSort = jest.fn();
        const { getByTestId } = renderWithContext(<SortByBar />, {
            filtersContext: {
                setSort,
            },
        });
        const button = getByTestId('sort-by-title-asc');

        await act(() => {
            fireEvent.click(button);
        });
        expect(setSort).toHaveBeenCalledTimes(1);
        expect(setSort).toHaveBeenCalledWith('title');

        const button2 = getByTestId('sort-by-price-asc');

        await act(() => {
            fireEvent.click(button2);
        });
        expect(setSort).toHaveBeenCalledTimes(2);
        expect(setSort).toHaveBeenCalledWith('price');
    });
});
