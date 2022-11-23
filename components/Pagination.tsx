'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useGetItems } from '../hooks/useGetItems';
import LoadingIcon from './LoadingIcon';
import Product from './Product';

type Props = {
    initialPage: number;
    search?: string;
};

const Pagination: React.FC<Props> = ({ initialPage, search }) => {
    const [page, setPage] = useState(initialPage);
    const observer = useRef<IntersectionObserver>();
    const { hasMore, isLoading } = useGetItems(page, search);

    const lastItemRef = useCallback(
        (node: HTMLDivElement) => {
            if (isLoading) return;

            if (observer.current) {
                observer.current.disconnect();
            }

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });

            if (node) {
                observer.current.observe(node);
            }
        },
        [hasMore, isLoading]
    );

    return (
        <>
            {items.map((item, index) => {
                // If it's the last item,
                // set the ref to the lastItemRef to start fetching more items
                if (items.length - 1 === index) {
                    return (
                        <Product key={index} item={item} ref={lastItemRef} />
                    );
                }
                return <Product key={index} item={item} />;
            })}
            {isLoading && (
                <div>
                    <LoadingIcon />
                </div>
            )}
        </>
    );
};

export default Pagination;
