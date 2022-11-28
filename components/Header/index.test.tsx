import { getByTestId } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { renderWithContext } from '__test__/utils';
import Header from '.';

jest.mock('next/link', () => {
    return function NextLink({
        children,
        ...props
    }: {
        children: React.ReactNode;
    }) {
        return <a {...props}>{children}</a>;
    };
});

jest.mock('next/router', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

describe('Header', () => {
    it('should render correctly', () => {
        const { container } = renderWithContext(<Header />);
        expect(container).toMatchSnapshot();
    });

    it('should call toggleFavorites on FavButton click', async () => {
        const toggleFavorites = jest.fn();

        const { container } = renderWithContext(<Header />, {
            favoritesContext: {
                toggleFavorites,
            },
        });

        expect(toggleFavorites).not.toHaveBeenCalled();

        const favButton = getByTestId(container, 'favbutton');
        await act(() => favButton.click());

        expect(toggleFavorites).toHaveBeenCalled();
    });

    it('should call setSearch with empty string on logo click', async () => {
        const setSearch = jest.fn();

        const { container } = renderWithContext(<Header />, {
            filtersContext: {
                setSearch,
            },
        });

        expect(setSearch).not.toHaveBeenCalled();

        const logo = getByTestId(container, 'logo');
        await act(() => logo.click());

        expect(setSearch).toHaveBeenCalledWith('');
    });
});
