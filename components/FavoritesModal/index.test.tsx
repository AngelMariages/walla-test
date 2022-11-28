import FavoritesModal from '.';
import { act, getByTestId, getByText, render } from '@testing-library/react';

describe('FavoritesModal', () => {
    it('should render correctly', () => {
        const { container } = render(
            <FavoritesModal visible={true} onClose={jest.fn()} favorites={[]} />
        );
        expect(container).toMatchSnapshot();
    });

    it('should call onClose if close btn clicked', async () => {
        const closeFn = jest.fn();
        const { container } = render(
            <FavoritesModal visible={true} onClose={closeFn} favorites={[]} />
        );
        expect(container).toMatchSnapshot();
        expect(container).toMatchSnapshot();

        expect(container.querySelector('h2')?.innerHTML).toBe('Favorites');
        const closeModal = getByTestId(container, 'close-fav-button');

        expect(closeFn).not.toHaveBeenCalled();

        await act(() => {
            closeModal.click();
        });

        expect(closeFn).toBeCalledTimes(1);
    });

    it('should not render if visible is false', () => {
        const { container } = render(
            <FavoritesModal
                visible={false}
                onClose={jest.fn()}
                favorites={[]}
            />
        );
        expect(container.innerHTML).toBe('');
    });

    it('should render favorites passed', () => {
        const favorites = [
            {
                title: 'Test',
                price: 100,
                image: 'https://test.com',
                description: 'Test description',
                email: 'test@test.com',
            },
        ];
        const { container } = render(
            <FavoritesModal
                visible={true}
                onClose={jest.fn()}
                favorites={favorites}
            />
        );
        expect(container).toMatchSnapshot();

        expect(container.querySelector('h2')?.innerHTML).toBe('Favorites');



        expect(getByText(container, 'Test')).toBeTruthy();
        expect(getByText(container, '100 €')).toBeTruthy();
        expect(getByText(container, 'Test description')).toBeTruthy();
    });
});
