import { Sort } from '../context/FiltersContext';
import { ApiResult } from '../pages/api/items';

export const fetchItemsOnClient = async (
    page = 1,
    search?: string,
    sort?: Sort,
): Promise<ApiResult> => {
    const params = new URLSearchParams();

    params.append('page', page.toString());
    if (search) {
        params.append('search', search);
    }
    if (sort) {
        params.append('sortBy', sort.sortBy);
        params.append('sortOrder', sort.sortOrder);
    }

    return await fetch(
        `/api/items?${params.toString()}`,
    ).then((res) => res.json());
};
