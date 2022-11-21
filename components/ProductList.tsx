import { fetchItems } from '../pages/api/items';
import Pagination from './Pagination';
import Product from './Product';

type Props = {
    search?: string;
};

function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
    return fn as (arg: T) => R;
}

export default asyncComponent(async function ProductList({ search }: Props) {
    const { data } = await fetchItems(0, search);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-400">
            {data.items.map((item, index) => (
                <Product key={index} item={item} />
            ))}
            {data.hasMore && <Pagination initialPage={1} search={search} />}
        </div>
    );
});
