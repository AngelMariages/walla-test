import ProductList from '../../components/ProductList';
import { fetchItems } from '../../pages/api/items';

type Props = {
    searchParams?: {
        query?: string;
    };
};

export default async function Search({ searchParams: { query } = {} }: Props) {
    const { data } = await fetchItems(1, query);

    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <h1>Search page</h1>
            <ProductList items={data.items} currentPage={1} search={query} />
        </div>
    );
}
