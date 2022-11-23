import type { AppProps } from 'next/app';
import Header from '../components/Header';
import { FiltersContextProvider } from '../context/FiltersContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <FiltersContextProvider>
            <Header />
            <Component {...pageProps} />
        </FiltersContextProvider>
    );
}
