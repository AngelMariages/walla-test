import Image from 'next/image';
import { forwardRef } from 'react';
import { Item } from '../pages/api/items';

type Props = {
    item: Item;
};

export default forwardRef<HTMLDivElement, Props>(function Product(
    { item },
    ref
) {
    return (
        <div className="m-5 border bg-slate-50 rounded-2xl" ref={ref}>
            <div className="w-32 h-32 relative overflow-hidden rounded-2xl">
                <Image
                    src={item.image}
                    alt={item.title}
                    className="hover:scale-125 transition-transform duration-500 ease-out"
                    fill
                    style={{
                        objectFit: 'contain',
                    }}
                />
            </div>
            <p className="text-lg font-bold">{item.title}</p>
            <p>{item.price}</p>
            <p>{item.description}</p>
        </div>
    );
});
