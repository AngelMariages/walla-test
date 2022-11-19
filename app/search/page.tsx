import ProductList from '../../components/ProductList';
import { fetchItems } from '../../lib/items';

export default async function Search({
    searchParams: { query },
}: {
    searchParams: { query?: string };
}) {
    const { data } = await fetchItems(1, query);

    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <h1>Search page</h1>
            <ProductList items={data.items} currentPage={1} search={query} />
        </div>
    );
}
