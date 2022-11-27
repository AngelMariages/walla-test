import { render } from '@testing-library/react';
import { FavoritesContextProvider } from 'context/FavoritesContext';
import { FiltersContextProvider } from 'context/FiltersContext';

export const renderWithContext = (ui: React.ReactElement) => {
    return render(
        <FiltersContextProvider>
            <FavoritesContextProvider>{ui}</FavoritesContextProvider>
        </FiltersContextProvider>
    );
};
