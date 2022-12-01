import { sortItems } from './sort';
import { Sort } from 'constants/sortBy';
import { Item } from 'constants/item';

describe('sortItems', () => {
    it.each([
        ['asc', 'title', 'title', 'title2'],
        ['desc', 'title', 'title2', 'title'],
        ['asc', 'description', 'description', 'description2'],
        ['desc', 'description', 'description2', 'description'],
        ['asc', 'email', 'email', 'email2'],
        ['desc', 'email', 'email2', 'email'],
        ['asc', 'price', 1, 2],
        ['desc', 'price', 2, 1],
    ])(
        'should sort items by %s %s',
        (sortOrder, sortBy, firstItem, secondItem) => {
            const items = [
                {
                    title: 'title',
                    description: 'description',
                    email: 'email',
                    price: 1,
                    image: 'image',
                },
                {
                    title: 'title2',
                    description: 'description2',
                    email: 'email2',
                    price: 2,
                    image: 'image2',
                },
            ];
            const sort = { sortOrder, sortBy } as Sort;
            const result = sortItems(items, sort);

            expect(result[0][sortBy as keyof Item]).toBe(firstItem);
            expect(result[1][sortBy as keyof Item]).toBe(secondItem);
        }
    );
});
