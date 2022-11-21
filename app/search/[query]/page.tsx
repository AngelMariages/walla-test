import ProductList from '../../../components/ProductList';

type Props = {
    params: {
        query: string;
    };
};

export default async function Search({ params: { query } }: Props) {
    return <ProductList search={query} />;
}
