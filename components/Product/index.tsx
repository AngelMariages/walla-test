import Image from 'next/image';
import { forwardRef, useContext } from 'react';
import FavIcon from 'public/icons/fav.svg';
import { FavoritesContext } from 'context/FavoritesContext';
import { Item } from 'constants/item';

type Props = {
    item: Item;
    selected?: boolean;
};

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
    }).format(price);
};

export default forwardRef<HTMLDivElement, Props>(function Product(
    { item, selected = false },
    ref
) {
    const { addFavorite, removeFavorite } = useContext(FavoritesContext);

    return (
        <div
            className="m-5 p-5 border bg-slate-50 rounded-2xl shadow-2xl"
            ref={ref}>
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
                <FavIcon
                    data-testid="favicon"
                    onClick={() => {
                        if (selected) {
                            removeFavorite(item);
                        } else {
                            addFavorite(item);
                        }
                    }}
                    className={`bg-white p-2 rounded-full absolute top-4 right-4 w-10 duration-500 ease-[cubic-bezier(0.95,0.05,0.795,0.035)] transition-colors ${
                        selected ? 'fill-red-500' : 'fill-transparent'
                    }`}
                />
            </div>
            <p className="text-lg font-bold">{item.title}</p>
            <p
                data-testid="price"
                className="text-md font-semibold text-right my-4 bg-slate-200 rounded-full inline-block px-4 py-1">
                {formatPrice(item.price)}
            </p>
            <p>{item.description}</p>
        </div>
    );
});
