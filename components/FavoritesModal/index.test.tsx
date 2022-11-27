import { renderWithContext } from '../../__test__/utils';
import FavoritesModal from '.';

describe('FavoritesModal', () => {
    it('should render correctly', () => {
        const { container } = renderWithContext(
            <FavoritesModal visible={true} onClose={jest.fn()} favorites={[]} />
        );
        expect(container).toMatchSnapshot();
    });

    it('should not render if visible is false', () => {
        const { container } = renderWithContext(
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
                description: 'Test',
                email: 'test@test.com',
            },
        ];
        const { container } = renderWithContext(
            <FavoritesModal
                visible={true}
                onClose={jest.fn()}
                favorites={favorites}
            />
        );
        expect(container).toMatchSnapshot();

        expect(container.querySelector('h2')?.innerHTML).toBe('Favorites');
    });
});
