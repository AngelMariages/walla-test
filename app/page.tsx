import Pagination from '../components/Pagination';
import Product from '../components/Product';
import { fetchItems } from '../lib/items';

export default async function Home({
    searchParams: { page = 1 },
}: {
    searchParams: { page?: number };
}) {
    const { data } = await fetchItems(Number(page));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-400">
            {data.items.map((item, index) => (
                <Product key={index} item={item} />
            ))}
            <Pagination initialPage={Number(page) + 1} />
        </div>
    );
}
