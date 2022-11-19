import { ApiResult } from '../pages/api/items';

export const fetchItems = async (page = 1, search?: string): Promise<ApiResult>  => {
    return await fetch(
        `http://localhost:3000/api/items?page=${page}${search ? `&search=${search}` : ''}`
    ).then((res) => res.json());
};
