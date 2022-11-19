import { useEffect, useRef, useState } from 'react';
import { fetchItems } from '../lib/items';
import { Item } from '../pages/api/items';

export const useGetItems = (page: number) => {
    const [data, setData] = useState<{
        items: Item[];
        hasMore: boolean;
    }>({ items: [], hasMore: true });

    const loading = useRef(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            if (loading.current) return;
            loading.current = true;

            setError(false);
            const { data, error } = await fetchItems(page);

            setData((prevData) => ({
                items: [...prevData.items, ...data.items],
                hasMore: data.hasMore,
            }));

            loading.current = false;
        })();
    }, [page]);

    return {
        isLoading: loading.current,
        error,
        hasMore: data.hasMore,
        items: data.items,
    };
};
