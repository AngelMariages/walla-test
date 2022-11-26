import type { AppProps } from 'next/app';
import Header from 'components/Header';
import { FavoritesContextProvider } from 'context/FavoritesContext';
import { FiltersContextProvider } from 'context/FiltersContext';
import 'styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <FavoritesContextProvider>
            <FiltersContextProvider>
                <Header />
                <Component {...pageProps} />
            </FiltersContextProvider>
        </FavoritesContextProvider>
    );
}
