import { filterItemsBySearch } from './filter';

describe('filterItemsBySearch', () => {
    it('should return all items when search is empty', () => {
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
        const search = '';
        const result = filterItemsBySearch(items, search);
        expect(result).toEqual(items);
    });

    it('should return filtered items by title', () => {
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
            {
                title: 'another2',
                description: 'another2',
                email: 'another2',
                price: 2,
                image: 'image2',
            },
        ];
        const search = 'title';
        const result = filterItemsBySearch(items, search);
        expect(result).toEqual([items[0], items[1]]);
    });

    it('should return filtered items by description', () => {
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
            {
                title: 'another2',
                description: 'another2',
                email: 'another2',
                price: 2,
                image: 'image2',
            },
        ];
        const search = 'description';
        const result = filterItemsBySearch(items, search);
        expect(result).toEqual([items[0], items[1]]);
    });

    it('should return filtered items by email', () => {
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
                price: 1,
                image: 'image2',
            },
            {
                title: 'another2',
                description: 'another2',
                email: 'another2',
                price: 2,
                image: 'image2',
            },
        ];
        const search = 'email';
        const result = filterItemsBySearch(items, search);
        expect(result).toEqual([items[0], items[1]]);
    });

    it('should return filtered items by price', () => {
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
                price: 1,
                image: 'image2',
            },
            {
                title: 'another2',
                description: 'another2',
                email: 'another2',
                price: 2,
                image: 'image2',
            },
        ];
        const search = 'email';
        const result = filterItemsBySearch(items, search);
        expect(result).toEqual([items[0], items[1]]);
    });
});
