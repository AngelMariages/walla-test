import { fireEvent, act } from '@testing-library/react';
import { renderWithContext } from '__test__/utils';
import SearchBar from '.';

const mockRouterPush = jest.fn();

jest.mock('next/router', () => ({
    useRouter: () => ({
        push: mockRouterPush,
    }),
}));

jest.mock('next/navigation', () => ({
    usePathname: () => '/search/test',
}));

describe('SearchBar', () => {
    it('should render correctly', () => {
        const { container } = renderWithContext(<SearchBar />);
        expect(container).toMatchSnapshot();
    });

    it('should call onSearch when input changes', async () => {
        const onSearch = jest.fn();
        const { getByTestId } = renderWithContext(<SearchBar />, {
            filtersContext: {
                setSearch: onSearch,
            },
        });
        const input = getByTestId('search-input');

        await act(() => {
            fireEvent.change(input, { target: { value: 'test' } });
        });
        expect(onSearch).toHaveBeenCalledTimes(1);
        expect(onSearch).toHaveBeenCalledWith('test');
    });

    it('should call router.push when form is submitted', async () => {
        const { getByTestId } = renderWithContext(<SearchBar />);
        const input = getByTestId('search-input');
        const form = getByTestId('search-form');

        await act(() => {
            fireEvent.change(input, { target: { value: 'second-test' } });

            fireEvent.submit(form);
        });
        expect(mockRouterPush).toHaveBeenCalledWith(
            '/search/second-test',
            undefined,
            {
                shallow: true,
            }
        );
    });
});
