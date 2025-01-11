import { KioskoItem } from '../models/kiosko';

export const get = async (customFetch = fetch) => {
    const response = await customFetch('/api/kiosko');
    const kioskoItems = await response.json();
    return kioskoItems.kioskoProducts;
}

export const search = async ( id: string) => {
    const response = await fetch(`/api/kiosko/${id}`);
    const kioskoItem = await response.json();
    return kioskoItem as KioskoItem;
}
