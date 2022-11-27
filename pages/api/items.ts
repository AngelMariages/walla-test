import type { NextApiRequest, NextApiResponse } from 'next';
import { Sort } from 'constants/sortBy';
import { fetchWithPagination } from 'lib/fetchItemsOnServer';
import { Item } from 'constants/item';

const API =
    'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json';
const DEFAULT_RESULT_LIMIT = 5;

export type ApiResult = {
    data: {
        items: Item[];
        hasMore: boolean;
    };
    error: string | null;
};

export const fetchItems = async (
    page: number,
    search?: string,
    sort?: Sort
) => {
    const data = await fetchWithPagination(
        API,
        DEFAULT_RESULT_LIMIT,
        Number(page),
        search,
        sort
    );

    return {
        data,
        error: null,
    };
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResult>
) {
    const { page = 1, search: rawSearch, sortBy, sortOrder } = req.query;

    const search = Array.isArray(rawSearch) ? rawSearch[0] : rawSearch;

    try {
        res.status(200).json(
            await fetchItems(Number(page), search, {
                sortBy: sortBy as Sort['sortBy'],
                sortOrder: sortOrder as Sort['sortOrder'],
            })
        );
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                data: { items: [], hasMore: false },
                error: error.message,
            });
        } else {
            res.status(500).json({
                data: { items: [], hasMore: false },
                error: 'Something went wrong',
            });
        }
    }
}
