import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import ProductList from '../../components/ProductList';
import { FiltersContextProvider } from '../../context/FiltersContext';
import { ApiResult, fetchItems } from '../api/items';

type Props = {
    initialData: ApiResult;
    search: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
    params,
}) => {
    const search = params?.query as string;

    return {
        props: {
            initialData: await fetchItems(1, search),
            search,
        },
    };
};

export default function Index({
    initialData,
    search,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <FiltersContextProvider overridenSearch={search}>
            <main className="container min-h-full min-w-full">
                <ProductList initialData={initialData} />
            </main>
        </FiltersContextProvider>
    );
}
