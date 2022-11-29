import { act, renderHook, RenderHookResult } from '@testing-library/react';
import { Sort } from 'constants/sortBy';
import useFetchProducts from '.';

const mockFetchItemsOnClient = jest.fn();

jest.mock('lib/fetchItemsOnClient', () => {
    return {
        fetchItemsOnClient: () => mockFetchItemsOnClient(),
    };
});

describe('useFetchProducts', () => {
    it('should set products to the response from the API', async () => {
        const item = {
            title: 'test',
            price: 1,
            description: 'test description',
            email: 'test@email.com',
            image: 'test',
        };

        const returnValue = Promise.resolve({
            data: {
                items: [item],
                hasMore: true,
            },
            error: null,
        });

        mockFetchItemsOnClient.mockReturnValue(returnValue);

        let result = {} as {
            current: ReturnType<typeof useFetchProducts>;
        };

        await act(async () => {
            const hook = renderHook(
                ({ page, sort }) => useFetchProducts(page, sort),
                {
                    initialProps: {
                        page: 1,
                        sort: {
                            sortBy: 'title',
                            sortOrder: 'asc',
                        } as Sort,
                    },
                }
            );

            result = hook.result;
        });

        await returnValue;

        expect(result.current.products).toEqual([item]);
        expect(result.current.hasMore).toBe(true);
        expect(result.current.isLoading).toBe(false);
    });
});
