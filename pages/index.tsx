import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useContext } from 'react';
import FavoritesModal from 'components/FavoritesModal';
import ProductList from 'components/ProductList';
import SortByBar from 'components/SortByBar';
import { FavoritesContext } from 'context/FavoritesContext';
import { ApiResult, fetchItems } from 'pages/api/items';

type Props = {
    initialData: ApiResult;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    return {
        props: {
            initialData: await fetchItems(1),
        },
    };
};

export default function Index({
    initialData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { favorites, favoritesVisible, toggleFavorites } =
        useContext(FavoritesContext);

    return (
        <>
            <FavoritesModal
                visible={favoritesVisible}
                onClose={toggleFavorites}
                favorites={favorites}
            />
            <main className="min-w-full overflow-auto h-full max-h-[calc(100vh_-_4rem)] md:max-h-[calc(100vh_-_6rem)]">
                <SortByBar />
                <ProductList initialData={initialData} />
            </main>
        </>
    );
}
