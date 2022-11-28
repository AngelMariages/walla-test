import { getByTestId, act } from '@testing-library/react';
import { renderWithContext } from '__test__/utils';
import Product from '.';

jest.mock('next/image', () => {
    return function NextImage({
        children,
        ...props
    }: {
        children: React.ReactNode;
    }) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                alt="test-img"
                {...{
                    ...props,
                    fill: undefined,
                }}>
                {children}
            </img>
        );
    };
});

describe('Product', () => {
    it('should render correctly', () => {
        const item = {
            title: 'title',
            price: 300,
            description: 'description',
            email: 'item@email.com',
            image: 'image.jpg',
        };

        const { container } = renderWithContext(<Product item={item} />);
        expect(container).toMatchSnapshot();
    });

    it('should render correctly with selected', () => {
        const item = {
            title: 'title',
            price: 300,
            description: 'description',
            email: 'selected@mail.com',
            image: 'image.jpg',
        };

        const { container } = renderWithContext(
            <Product item={item} selected />
        );
        expect(container).toMatchSnapshot();
    });

    it('should call addFavorite or removeFavorite depending on selected state', async () => {
        const item = {
            title: 'title',
            price: 300,
            description: 'description',
            email: 'selected@mail.com',
            image: 'image.jpg',
        };

        const addFavorite = jest.fn();
        const removeFavorite = jest.fn();

        const { container } = renderWithContext(<Product item={item} />, {
            favoritesContext: {
                addFavorite,
                removeFavorite,
            },
        });

        expect(addFavorite).not.toHaveBeenCalled();
        expect(removeFavorite).not.toHaveBeenCalled();

        const favButton = getByTestId(container, 'favicon');
        await act(() => favButton.click());

        expect(addFavorite).toHaveBeenCalled();
        expect(removeFavorite).not.toHaveBeenCalled();

        jest.resetAllMocks();

        const { container: container2 } = renderWithContext(
            <Product item={item} selected />,
            {
                favoritesContext: {
                    addFavorite,
                    removeFavorite,
                },
            }
        );

        const favButton2 = getByTestId(container2, 'favicon');
        await act(() => favButton2.click());

        expect(addFavorite).not.toHaveBeenCalled();
        expect(removeFavorite).toHaveBeenCalled();
    });

    it('should format price correctly', () => {
        const item = {
            title: 'title',
            price: 302.45,
            description: 'description',
            email: 'test@test.com',
            image: 'image.jpg',
        };

        const { container } = renderWithContext(<Product item={item} />);
        expect(container).toMatchSnapshot();

        const price = getByTestId(container, 'price');

        expect(price.textContent).toBe('302,45\xa0€');
    });
});
