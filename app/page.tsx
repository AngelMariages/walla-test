import ProductList from '../components/ProductList';
import { fetchItems } from '../lib/items';

export default async function Home({
    searchParams: { page = 1 },
}: {
    searchParams: { page?: number };
}) {
    const { data } = await fetchItems(Number(page));

    return <ProductList items={data.items} currentPage={Number(page)} />;
}
