'use client';
import { useCallback, useRef, useState } from 'react';
import { useGetItems } from '../hooks/useGetItems';
import Product from './Product';

const Pagination = ({ initialPage }: { initialPage: number }) => {
    const [page, setPage] = useState(initialPage);
    const observer = useRef<IntersectionObserver>();
    const { items, hasMore, isLoading } = useGetItems(page);

    const lastItemRef = useCallback(
        (node: HTMLDivElement) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [hasMore]
    );

    return (
        <>
            {items.map((item, index) => {
                // If it's the penultimate item,
                // set the ref to the lastItemRef to start fetching more items
                if (items.length === index + 2) {
                    return (
                        <Product key={index} item={item} ref={lastItemRef} />
                    );
                }
                return <Product key={index} item={item} />;
            })}
            <div>{isLoading && 'Loading ...'}</div>
        </>
    );
};

export default Pagination;
