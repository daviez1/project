import { inventory } from '../stores/inventory';
export const get = async (customFetch = fetch) => {
    const response = await customFetch('/api/inventory/items');
    const inventoryItems = await response.json();
    return inventoryItems.inventoryItems;
}

// export const search = async ( id: string) => {
//     const response = await fetch(`/api/inventory/${id}`);
//     const inventoryItem = await response.json();
//     return inventoryItem as InventoryItem;
// }
