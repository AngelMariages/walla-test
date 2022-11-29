import { useEffect, useState } from 'react';
import { Sort } from 'constants/sortBy';
import { fetchItemsOnClient } from 'lib/fetchItemsOnClient';
import { ApiResult } from 'pages/api/items';
import { Item } from 'constants/item';

const useFetchProducts = (
    page: number,
    sort: Sort,
    search?: string,
    initialData?: ApiResult,
) => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [products, setProducts] = useState<Item[]>(
        initialData?.data.items || []
    );

    useEffect(() => {
        (async () => {
            if (isLoading) return;

            setIsLoading(true);

            const { data } = await fetchItemsOnClient(page, search, sort);

            setProducts((prev) =>
                page === 1 ? [...data.items] : [...prev, ...data.items]
            );
            setHasMore(data.hasMore);

            setIsLoading(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, page, sort]);

    return {
        isLoading,
        products,
        hasMore,
    };
};

export default useFetchProducts;
