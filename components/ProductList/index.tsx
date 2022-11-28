import { useCallback, useContext } from 'react';
import { FavoritesContext } from 'context/FavoritesContext';
import { FiltersContext } from 'context/FiltersContext';
import useFetchProducts from 'hooks/useFetchProducts';
import useInfinteScroll from 'hooks/useInfiniteScroll';
import { ApiResult } from 'pages/api/items';
import LoadingIcon from 'components/LoadingIcon';
import Product from 'components/Product';

type Props = {
    initialData?: ApiResult;
};

const ProductList: React.FC<Props> = ({ initialData }) => {
    const { search, page, sort, incrementPage } = useContext(FiltersContext);
    const { isFavorite } = useContext(FavoritesContext);

    const { isLoading, products, hasMore } = useFetchProducts(
        initialData,
        page,
        sort,
        search
    );

    const { itemRef } = useInfinteScroll(
        useCallback(() => {
            if (!isLoading) {
                incrementPage();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isLoading])
    );

    return (
        <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 bg-gray-300">
            {products.length === 0 ? (
                <div className="text-center text-2xl font-bold">
                    No items found
                </div>
            ) : null}
            {products.map((item, index) => (
                <Product key={index} item={item} selected={isFavorite(item)} />
            ))}
            {hasMore || isLoading ? (
                <div ref={itemRef}>
                    <LoadingIcon />
                </div>
            ) : null}
        </div>
    );
};

export default ProductList;
