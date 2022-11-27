import { Item } from 'constants/item';
import { createContext, PropsWithChildren, useCallback, useState } from 'react';

type FavoritesContextType = {
    favoritesVisible: boolean;
    toggleFavorites: () => void;
    favorites: Item[];
    addFavorite: (item: Item) => void;
    removeFavorite: (item: Item) => void;
    isFavorite: (item: Item) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType>({
    favoritesVisible: false,
    toggleFavorites: () => false,
    favorites: [],
    addFavorite: () => false,
    removeFavorite: () => false,
    isFavorite: () => false,
});

const FavoritesContextProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const [favoritesVisible, setFavoritesVisible] = useState(false);
    const [favorites, setFavorites] = useState<Item[]>([]);
    const addFavorite = useCallback((item: Item) => {
        setFavorites((prev) => [...prev, item]);
    }, []);
    const removeFavorite = useCallback((item: Item) => {
        setFavorites((prev) =>
            prev.filter((i) => i.title !== item.title && item.email !== i.email)
        );
    }, []);

    const isFavorite = useCallback(
        (item: Item) => {
            return favorites.some(
                (fav) => fav.title === item.title && fav.email === item.email
            );
        },
        [favorites]
    );

    return (
        <FavoritesContext.Provider
            value={{
                favoritesVisible,
                toggleFavorites: () => setFavoritesVisible((prev) => !prev),
                favorites,
                addFavorite,
                removeFavorite,
                isFavorite,
            }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export { FavoritesContext, FavoritesContextProvider };
