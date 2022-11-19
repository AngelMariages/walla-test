import { ApiResult } from '../pages/api/items';

export const fetchItemsOnClient = async (page = 1, search?: string): Promise<ApiResult>  => {
    return await fetch(
        `/api/items?page=${page}${search ? `&search=${search}` : ''}`
    ).then((res) => res.json());
};
