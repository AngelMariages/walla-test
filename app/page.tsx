import ProductList from '../components/ProductList';
import { fetchItems } from '../pages/api/items';

type Props = {
    searchParams?: {
        page?: number;
    };
};

export default async function Home({ searchParams: { page = 1 } = {} }: Props) {
    const { data } = await fetchItems(Number(page));

    return <ProductList items={data.items} currentPage={Number(page)} />;
}
