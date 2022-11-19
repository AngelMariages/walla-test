import { ApiResult } from '../pages/api/items';

export const fetchItems = async (page = 1): Promise<ApiResult>  => {
    return await fetch(
        `http://localhost:3000/api/items?page=${page}`
    ).then((res) => res.json());
};
