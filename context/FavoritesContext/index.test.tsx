import { getByTestId, render, act } from '@testing-library/react';
import { useContext, useEffect } from 'react';
import { FavoritesContext, FavoritesContextProvider } from '.';

describe('FavoritesContext', () => {
    it('should set favoritesVisible to true when toggleFavorites is called', async () => {
        const TestComponent = () => {
            const { toggleFavorites, favoritesVisible } =
                useContext(FavoritesContext);
            return (
                <>
                    <button data-testid="toggle-btn" onClick={toggleFavorites}>
                        Toggle
                    </button>
                    <div data-testid="favorites-visible">
                        {favoritesVisible.toString()}
                    </div>
                </>
            );
        };
        const { container } = render(
            <FavoritesContextProvider>
                <TestComponent />
            </FavoritesContextProvider>
        );
        const toggleButton = getByTestId(container, 'toggle-btn');
        const favoritesVisible = getByTestId(container, 'favorites-visible');

        expect(favoritesVisible.textContent).toBe('false');

        await act(() => {
            toggleButton.click();
        });
        expect(favoritesVisible.textContent).toBe('true');

        await act(() => {
            toggleButton.click();
        });
        expect(favoritesVisible.textContent).toBe('false');
    });

    it('should add a favorite when addFavorite is called', async () => {
        const item = {
            title: 'test',
            price: 30,
            email: 'test@test.com',
            description: 'test description',
            image: 'test image',
        };
        const item2 = {
            title: 'test-2',
            price: 30,
            email: 'test-2@test.com',
            description: 'test description',
            image: 'test image',
        };

        const TestComponent = () => {
            const { addFavorite, favorites } = useContext(FavoritesContext);

            useEffect(() => {
                addFavorite(item);
            }, [addFavorite]);

            return (
                <>
                    <button
                        data-testid="add-btn"
                        onClick={() => addFavorite(item2)}
                    />
                    <pre data-testid="favorites-content">
                        {JSON.stringify(favorites)}
                    </pre>
                </>
            );
        };

        const { container } = render(
            <FavoritesContextProvider>
                <TestComponent />
            </FavoritesContextProvider>
        );

        const addButton = getByTestId(container, 'add-btn');
        const favoritesContent = getByTestId(container, 'favorites-content');

        expect(favoritesContent.textContent).toBe(JSON.stringify([item]));

        await act(() => {
            addButton.click();
        });

        expect(favoritesContent.textContent).toBe(
            JSON.stringify([item, item2])
        );
    });

    it('should remove a favorite when removeFavorite is called', async () => {
        const item = {
            title: 'test',
            price: 30,
            email: 'test@test.com',
            description: 'test description',
            image: 'test image',
        };
        const item2 = {
            title: 'test-2',
            price: 30,
            email: 'test-2@test.com',
            description: 'test description',
            image: 'test image',
        };

        const TestComponent = () => {
            const { addFavorite, removeFavorite, favorites } =
                useContext(FavoritesContext);

            useEffect(() => {
                addFavorite(item);
                addFavorite(item2);
            }, [addFavorite]);

            return (
                <>
                    <button
                        data-testid="remove-btn"
                        onClick={() => removeFavorite(item)}
                    />
                    <pre data-testid="favorites-content">
                        {JSON.stringify(favorites)}
                    </pre>
                </>
            );
        };

        const { container } = render(
            <FavoritesContextProvider>
                <TestComponent />
            </FavoritesContextProvider>
        );

        const removeButton = getByTestId(container, 'remove-btn');
        const favoritesContent = getByTestId(container, 'favorites-content');

        expect(favoritesContent.textContent).toBe(
            JSON.stringify([item, item2])
        );

        await act(() => {
            removeButton.click();
        });

        expect(favoritesContent.textContent).toBe(JSON.stringify([item2]));
    });

    it('should return true when isFavorite is called with a favorite', async () => {
        const item = {
            title: 'test',
            price: 30,
            email: 'test@email.com',
            description: 'test description',
            image: 'test image',
        };

        const TestComponent = () => {
            const { addFavorite, removeFavorite, isFavorite } =
                useContext(FavoritesContext);

            useEffect(() => {
                addFavorite(item);
            }, [addFavorite]);

            return (
                <>
                    <pre data-testid="is-favorite">
                        {isFavorite(item).toString()}
                    </pre>
                    <button
                        data-testid="remove-btn"
                        onClick={() => removeFavorite(item)}
                    />
                </>
            );
        };

        const { container } = render(
            <FavoritesContextProvider>
                <TestComponent />
            </FavoritesContextProvider>
        );

        const isFavorite = getByTestId(container, 'is-favorite');

        expect(isFavorite.textContent).toBe('true');

        const removeButton = getByTestId(container, 'remove-btn');

        await act(() => {
            removeButton.click();
        });

        expect(isFavorite.textContent).toBe('false');
    });
});
