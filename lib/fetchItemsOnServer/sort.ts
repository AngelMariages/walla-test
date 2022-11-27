import { Item } from 'constants/item';
import { Sort } from 'constants/sortBy';

export const sortItems = (items: Item[], sort: Sort) => {
    return items.sort((a, b) => {
        if (sort.sortBy === 'price') {
            return sort.sortOrder === 'asc'
                ? a.price - b.price
                : b.price - a.price;
        }

        const aItem = `${a[sort.sortBy]}`.toLowerCase();
        const bItem = `${b[sort.sortBy]}`.toLowerCase();

        if (sort.sortOrder === 'asc') {
            return aItem > bItem ? 1 : -1;
        } else {
            return aItem < bItem ? 1 : -1;
        }
    });
};
