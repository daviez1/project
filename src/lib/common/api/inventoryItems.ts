import type { InventoryItem } from '$lib/types/inventory';
import mongoose from 'mongoose';

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

export const DELETE = async ( category: string ) => {
    const response = await fetch(`/api/inventory/items/${category}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Error al eliminar el elemento del inventario');
    }

    const inventoryItem = await response.json();    
    console.log(inventoryItem);
    return inventoryItem.deletedItem as InventoryItem;
};

