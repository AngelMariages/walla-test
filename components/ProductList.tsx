import { Item } from '../pages/api/items';
import Pagination from './Pagination';
import Product from './Product';

type Props = {
    items: Item[];
    currentPage: number;
    search?: string;
};

const ProductList: React.FC<Props> = ({ items, currentPage, search }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-400">
            {items.map((item, index) => (
                <Product key={index} item={item} />
            ))}
            <Pagination initialPage={currentPage + 1} search={search} />
        </div>
    );
};

export default ProductList;
