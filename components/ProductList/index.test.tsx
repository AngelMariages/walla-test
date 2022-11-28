import useFetchProducts from 'hooks/useFetchProducts';
import { PropsWithChildren } from 'react';
import { renderWithContext } from '__test__/utils';
import ProductList from '.';

jest.mock('hooks/useFetchProducts', () => {
    return jest.fn(() => ({
        isLoading: false,
        products: [],
        hasMore: false,
    }));
});

jest.mock('hooks/useInfiniteScroll', () => {
    return jest.fn(() => ({
        itemRef: null,
    }));
});

const mockProductComponent = jest.fn();

jest.mock('components/Product', () => {
    return function ProductComponent(props: PropsWithChildren) {
        mockProductComponent(props);
        return <div {...props}>{props.children}</div>;
    };
});

const mockLoadingIconComponent = jest.fn();

jest.mock('components/LoadingIcon', () => {
    return function LoadingIconComponent(props: PropsWithChildren) {
        mockLoadingIconComponent(props);
        return <div {...props}>{props.children}</div>;
    };
});

describe('ProductList', () => {
    it('should render correctly empty list', () => {
        const { container } = renderWithContext(<ProductList />);
        expect(container).toMatchSnapshot();
        expect(useFetchProducts).toHaveBeenCalledTimes(1);
        expect(useFetchProducts).toHaveBeenCalledWith(
            undefined,
            1,
            { sortBy: 'title', sortOrder: 'asc' },
            ''
        );
    });

    it('should render correctly with products', () => {
        const item = {
            title: 'title',
            price: 300,
            description: 'description',
            email: 'test@mail.com',
            image: 'image.jpg',
        };
        const item2 = {
            title: 'title2',
            price: 300,
            description: 'description',
            email: 'test@mail.com',
            image: 'image.jpg',
        };

        (useFetchProducts as jest.Mock).mockImplementation(() => {
            return {
                isLoading: false,
                products: [item, item2],
                hasMore: false,
            };
        });

        const { container } = renderWithContext(<ProductList />);
        expect(container).toMatchSnapshot();

        expect(mockProductComponent).toHaveBeenCalledTimes(2);
        expect(mockProductComponent).toHaveBeenCalledWith({
            item: item,
        });
        expect(mockProductComponent).toHaveBeenCalledWith({
            item: item2,
        });
    });

    it('should render loading icon if hasMore or isLoading', () => {
        (useFetchProducts as jest.Mock).mockImplementation(() => {
            return {
                isLoading: true,
                products: [],
                hasMore: false,
            };
        });

        const { container } = renderWithContext(<ProductList />);
        expect(container).toMatchSnapshot();

        expect(mockLoadingIconComponent).toHaveBeenCalledTimes(1);

        mockLoadingIconComponent.mockClear();

        (useFetchProducts as jest.Mock).mockImplementation(() => {
            return {
                isLoading: false,
                products: [],
                hasMore: true,
            };
        });

        const { container: container2 } = renderWithContext(<ProductList />);
        expect(container2).toMatchSnapshot();

        expect(mockLoadingIconComponent).toHaveBeenCalledTimes(1);
    });
});
