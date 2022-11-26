import { useCallback, useContext, useEffect, useState } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { FiltersContext } from '../context/FiltersContext';
import useInfinteScroll from '../hooks/useInfiniteScroll';
import { fetchItemsOnClient } from '../lib/items';
import { ApiResult } from '../pages/api/items';
import LoadingIcon from './LoadingIcon';
import Product from './Product';

type Props = {
    initialData: ApiResult;
};

const ProductList: React.FC<Props> = ({ initialData }) => {
    const { search, page, sort, incrementPage } = useContext(FiltersContext);
    const { isFavorite } = useContext(FavoritesContext);

    const [data, setData] = useState(initialData.data);
    const [isLoading, setIsLoading] = useState(false);

    const { itemRef } = useInfinteScroll(
        useCallback(() => {
            if (!isLoading) {
                incrementPage();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isLoading])
    );

    useEffect(() => {
        (async () => {
            if (isLoading) return;

            setIsLoading(true);

            const { data } = await fetchItemsOnClient(page, search, sort);

            setData((prev) => ({
                ...data,
                items:
                    page === 1
                        ? [...data.items]
                        : [...prev.items, ...data.items],
            }));

            setIsLoading(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, page, sort]);

    return (
        <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 bg-gray-300">
            {data.items.length === 0 ? (
                <div className="text-center text-2xl font-bold">
                    No items found
                </div>
            ) : null}
            {data.items.map((item, index) => (
                <Product key={index} item={item} selected={isFavorite(item)} />
            ))}
            {data.hasMore || isLoading ? (
                <div ref={itemRef}>
                    <LoadingIcon />
                </div>
            ) : null}
        </div>
    );
};

export default ProductList;
