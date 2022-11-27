import { Item } from 'constants/item';

export const filterItemsBySearch = (items: Item[], search?: string) => {
    if (!search) {
        return items;
    }

    return items.filter((item) => {
        return (
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase()) ||
            item.email.toLowerCase().includes(search.toLowerCase()) ||
            item.price.toString().includes(search.toLowerCase())
        );
    });
};
