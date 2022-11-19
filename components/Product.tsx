import { forwardRef } from 'react';
import { Item } from '../pages/api/items';

type Props = {
    item: Item;
};

const Product = forwardRef<HTMLDivElement, Props>(({ item }, ref) => {
    return (
        <div className="m-5 border bg-slate-50 rounded-2xl" ref={ref}>
            <img src={item.image} width={150} alt={item.title} />
            <p className='text-lg font-bold'>{item.title}</p>
            <p>{item.price}</p>
            <p>{item.description}</p>
        </div>
    );
});

export default Product;
