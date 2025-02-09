import type { InventoryItem } from '$lib/types/inventory';

export const get = async (customFetch = fetch) => {
    const response = await customFetch('/api/inventory/items');
    const inventoryItems = await response.json();
    return inventoryItems.inventoryItems;
}

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
    return inventoryItem.deletedItem as InventoryItem;
};

