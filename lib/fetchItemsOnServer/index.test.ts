import { Sort } from 'constants/sortBy';
import { fetchWithPagination } from '.';

const mockItemsList = [
    {
        title: 'Item 1',
        description: 'Description 1',
        price: 1,
        email: 'email1',
        image: 'image1.jpg',
    },
    {
        title: 'Item 2',
        description: 'Description 2',
        price: 2,
        email: 'email1',
        image: 'image2.jpg',
    },
    {
        title: 'Itemm 3',
        description: 'Descriptionn 3',
        price: 3,
        email: 'email3',
        image: 'image3.jpg',
    },
];

describe('fetchWithPagination', () => {
    beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue({
            json: () =>
                Promise.resolve({
                    items: [...mockItemsList],
                }),
        });
    });

    afterEach(() => {
        (global.fetch as jest.Mock).mockClear();
    });

    it('should fetch items with pagination', async () => {
        const api = 'https://jsonplaceholder.typicode.com/todos';
        const limit = 2;
        const page = 1;
        const result = await fetchWithPagination(api, limit, page);

        expect(result).toEqual({
            items: [mockItemsList[0], mockItemsList[1]],
            hasMore: true,
        });

        const result2 = await fetchWithPagination(api, limit, 2);

        expect(result2).toEqual({
            items: [mockItemsList[2]],
            hasMore: false,
        });

        expect(global.fetch).toHaveBeenCalledTimes(2);
        expect(global.fetch).toHaveBeenCalledWith(api);
    });

    it('should fetch items with pagination and search', async () => {
        const api = 'https://jsonplaceholder.typicode.com/todos';
        const limit = 1;
        const page = 1;
        const search = 'Item 1';
        const result = await fetchWithPagination(api, limit, page, search);

        expect(result).toEqual({
            items: [mockItemsList[0]],
            hasMore: false,
        });
    });

    it('should fetch items with pagination, search and sort', async () => {
        const api = 'https://jsonplaceholder.typicode.com/todos';
        const limit = 2;
        const page = 1;
        const search = 'email1';
        const sort = {
            sortBy: 'title',
            sortOrder: 'desc',
        } as Sort;
        const result = await fetchWithPagination(
            api,
            limit,
            page,
            search,
            sort
        );

        expect(result).toEqual({
            items: [mockItemsList[1], mockItemsList[0]],
            hasMore: false,
        });
    });
});
