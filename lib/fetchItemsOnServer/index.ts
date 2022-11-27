import { Item } from 'constants/item';
import { Sort } from 'constants/sortBy';
import { filterItemsBySearch } from './filter';
import { sortItems } from './sort';

// Simulate API with pagination
export const fetchWithPagination = async (
    api: string,
    limit: number,
    page: number,
    search?: string,
    sort: Sort = { sortBy: 'title', sortOrder: 'asc' }
) => {
    const response = await fetch(api).then((res) => res.json());

    const items = response.items as Item[];

    const filteredItems = filterItemsBySearch(items, search);
    const sortedItems = sortItems(filteredItems, sort);

    const start = (page - 1) * limit;
    const end = start + limit;

    return {
        items: sortedItems.slice(start, end),
        hasMore: sortedItems.length > end,
    };
};
