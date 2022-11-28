import { render } from '@testing-library/react';
import {
    FavoritesContext,
    FavoritesContextType,
} from 'context/FavoritesContext';
import { FiltersContext, FiltersContextType } from 'context/FiltersContext';

type ContextValues = {
    filtersContext?: Partial<FiltersContextType>;
    favoritesContext?: Partial<FavoritesContextType>;
};

export const renderWithContext = (
    ui: React.ReactElement,
    contextValues?: ContextValues
) => {
    return render(
        <FiltersContext.Provider
            value={{
                search: '',
                setSearch: jest.fn(),
                page: 1,
                incrementPage: jest.fn(),
                sort: {
                    sortBy: 'title',
                    sortOrder: 'asc',
                },
                setSort: jest.fn(),
                ...(contextValues?.filtersContext || {}),
            }}>
            <FavoritesContext.Provider
                value={{
                    favorites: [],
                    favoritesVisible: false,
                    addFavorite: jest.fn(),
                    removeFavorite: jest.fn(),
                    isFavorite: jest.fn(),
                    toggleFavorites: jest.fn(),
                    ...(contextValues?.favoritesContext || {}),
                }}>
                {ui}
            </FavoritesContext.Provider>
        </FiltersContext.Provider>
    );
};
