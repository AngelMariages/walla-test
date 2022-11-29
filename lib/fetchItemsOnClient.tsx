import { Sort } from 'constants/sortBy';
import { ApiResult } from 'pages/api/items';

const abortControllers: AbortController[] = [];

export const fetchItemsOnClient = async (
    page = 1,
    search?: string,
    sort?: Sort
): Promise<ApiResult> => {
    for (let i = 0; i < abortControllers.length; i++) {
        abortControllers.shift()?.abort();
    }

    const abortController = new AbortController();
    const params = new URLSearchParams();

    params.append('page', page.toString());
    if (search) {
        params.append('search', search);
    }
    if (sort) {
        params.append('sortBy', sort.sortBy);
        params.append('sortOrder', sort.sortOrder);
    }

    abortControllers.push(abortController);

    return await fetch(`/api/items?${params.toString()}`, {
        signal: abortController.signal,
    }).then((res) => res.json());
};
