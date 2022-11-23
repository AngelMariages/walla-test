import type { NextApiRequest, NextApiResponse } from 'next';

const API =
    'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json';

export type Item = {
    title: string;
    description: string;
    price: number;
    email: string;
    image: string;
};

export type ApiResult = {
    data: {
        items: Item[];
        hasMore: boolean;
    };
    error: string | null;
};

const DEFAULT_RESULT_LIMIT = 5;

// Simulate API with pagination
const fetchWithPagination = async (page: number, search?: string) => {
    const response = await fetch(API).then((res) => res.json());

    const items = response.items as Item[];

    const filteredItems = search
        ? items.filter((item) => {
              return (
                  item.title.toLowerCase().includes(search.toLowerCase()) ||
                  item.description
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                  item.email.toLowerCase().includes(search.toLowerCase()) ||
                  item.price.toString().includes(search.toLowerCase())
              );
          })
        : items;

    const start = (page - 1) * DEFAULT_RESULT_LIMIT;
    const end = start + DEFAULT_RESULT_LIMIT;

    return {
        items: filteredItems.slice(start, end),
        hasMore: filteredItems.length > end,
    };
};

export const fetchItems = async (page: number, search?: string) => {
    try {
        const data = await fetchWithPagination(Number(page), search);

        return {
            data,
            error: null,
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                data: { items: [], hasMore: false },
                error: error.message,
            };
        }
        return {
            data: { items: [], hasMore: false },
            error: 'An unknown error occurred',
        };
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResult>
) {
    const { page = 1, search: rawSearch } = req.query;

    const search = Array.isArray(rawSearch) ? rawSearch[0] : rawSearch;

    try {
        const result = await fetchWithPagination(Number(page), search);
        res.status(200).json({ data: result, error: null });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                data: { items: [], hasMore: false },
                error: error.message,
            });
        }
    }
}
