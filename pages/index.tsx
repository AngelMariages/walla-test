import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import ProductList from '../components/ProductList';
import { FiltersContextProvider } from '../context/FiltersContext';
import { ApiResult, fetchItems } from './api/items';

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
    return (
        <main className="container min-h-full min-w-full bg-gray-300">
            <ProductList initialData={initialData} />
        </main>
    );
}
