import { useEffect, useRef, useState } from 'react';
import { fetchItemsOnClient } from '../lib/items';
import { Item } from '../pages/api/items';

export const useGetItems = (page: number, search?: string) => {
    const [data, setData] = useState<{
        items: Item[];
        hasMore: boolean;
    }>({ items: [], hasMore: true });

    const loading = useRef(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            if (loading.current) return;

            loading.current = true;
            setError(null);

            const { data, error } = await fetchItemsOnClient(page, search);

            setData((prevData) => ({
                items: [...prevData.items, ...data.items],
                hasMore: data.hasMore,
            }));
            setError(error);

            loading.current = false;
        })();
    }, [page, search]);

    return {
        isLoading: loading.current,
        error,
        hasMore: data.hasMore,
        items: data.items,
    };
};
