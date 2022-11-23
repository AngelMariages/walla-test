import { useEffect, useState } from 'react';
import { fetchItemsOnClient } from '../lib/items';
import { Item } from '../pages/api/items';

export const useGetItems = (page: number, search?: string) => {
    const [data, setData] = useState<{
        items: Item[];
        hasMore: boolean;
    }>({ items: [], hasMore: true });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            if (isLoading) return;

            setIsLoading(true);
            setError(null);

            const { data, error } = await fetchItemsOnClient(page, search);

            setData((prevData) => ({
                items: [...prevData.items, ...data.items],
                hasMore: data.hasMore,
            }));
            setError(error);

            setIsLoading(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, search]);

    return {
        isLoading,
        error,
        hasMore: data.hasMore,
        items: data.items,
    };
};
