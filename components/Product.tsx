import Image from 'next/image';
import { forwardRef } from 'react';
import { Item } from '../pages/api/items';

type Props = {
    item: Item;
};

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
    }).format(price);
};

export default forwardRef<HTMLDivElement, Props>(function Product(
    { item },
    ref
) {
    return (
        <div className="m-5 p-5 border bg-slate-50 rounded-2xl" ref={ref}>
            <div className="w-full h-80 mb-4 relative overflow-hidden rounded-2xl">
                <Image
                    src={item.image}
                    alt={item.title}
                    className="md:hover:scale-125 transition-transform duration-500 ease-out"
                    fill
                    style={{
                        objectFit: 'cover',
                    }}
                />
            </div>
            <p className="text-lg font-bold">{item.title}</p>
            <p className="text-md font-semibold text-right my-4 bg-slate-200 rounded-full inline-block px-4 py-1">
                {formatPrice(item.price)}
            </p>
            <p>{item.description}</p>
        </div>
    );
});
