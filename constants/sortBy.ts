export const sortBys = ['title', 'description', 'price', 'email'] as const;

export const sortOrder = ['asc', 'desc'] as const;

export type Sort = {
    sortBy: typeof sortBys[number];
    sortOrder: typeof sortOrder[number];
};
