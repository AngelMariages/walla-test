import ProductList from '../../../components/ProductList';

type Props = {
    params: {
        query: string;
    };
};

export const revalidate = 10;

export default async function Search({ params: { query } }: Props) {
    return <ProductList search={query} />;
}
