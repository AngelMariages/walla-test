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
const fetchWithPagination = async (page: number) => {
    const response = await fetch(API).then((res) => res.json());

    const items = response.items as Item[];

    const start = (page - 1) * DEFAULT_RESULT_LIMIT;
    const end = start + DEFAULT_RESULT_LIMIT;

    return {
        items: items.slice(start, end),
        hasMore: items.length > end,
    };
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResult>
) {
    const { page = 1 } = req.query;

    try {
        const result = await fetchWithPagination(Number(page));
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
