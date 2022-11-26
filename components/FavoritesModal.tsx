import { Item } from '../pages/api/items';
import Product from './Product';

type Props = {
    visible: boolean;
    onClose: () => void;
    favorites: Item[];
};

const FavoritesModal: React.FC<Props> = ({ visible, onClose, favorites }) => {
    if (!visible) return null;

    return (
        <div className="z-10 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            />
            <div className="z-20 bg-white rounded-lg p-4 max-w-[30rem]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-4xl font-bold">Favorites</h2>
                    <button
                        className="text-xl font-bold ring-2 ring-black rounded-full w-8 h-8 flex items-center justify-center"
                        onClick={onClose}
                        aria-label="Close">
                        X
                    </button>
                </div>

                <div className="grid sm:grid-cols-1 gap-4 bg-gray-300 min-h-[40rem] min-w-[24rem] max-h-[calc(100vh_-_16rem)]  overflow-y-auto">
                    {favorites.length === 0 ? (
                        <div className="text-center text-2xl font-bold self-center">
                            No items found
                        </div>
                    ) : null}
                    {favorites.map((item, index) => (
                        <Product key={index} item={item} selected={true} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FavoritesModal;
