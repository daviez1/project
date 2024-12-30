import { writable, derived } from 'svelte/store';
import type { InventoryItem, InventoryFilter, StockUpdate } from '$lib/types/inventory';
import * as InventoryApi from "../api/inventoryItems";

// Create the inventory store
function createInventoryStore() {
  const { subscribe, set, update } = writable<InventoryItem[]>([]);

    const post = async (newInventoryItem: InventoryItem) => {
       const response = await fetch('/api/inventory/items', {
         method: 'POST', headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify(newInventoryItem), });
          if (!response.ok) { throw new Error('Error al crear el producto en el inventario'); } 
          const newItem = await response.json(); 
          update(inventorys => [...inventorys, newItem]); 
        };

  return {
    subscribe,
    addInventoryItem: post,
    fetchInventoryItems: async () => {
      try {
        const items = await InventoryApi.get();
        if (items) {
          set(items);
        } else {
          console.error("No data returned from API");
        }
      } catch (error) {
        console.error("Error fetching inventory items:", error);
      }
    },
    updateStock: (stockUpdate: StockUpdate) => 
      update(items => 
        items.map(item => 
          item.id === stockUpdate.id
            ? {
                ...item,
                quantity: stockUpdate.type === 'add' 
                  ? item.quantity + stockUpdate.quantity
                  : Math.max(0, item.quantity - stockUpdate.quantity),
                lastRestocked: stockUpdate.type === 'add' ? new Date() : item.lastRestocked
              }
            : item
        )
      ),
    updateAvailability: (id: string, available: boolean) =>
      update(items =>
        items.map(item =>
          item.id === id ? { ...item, available } : item
        )
      ),
    updateItem: (updatedItem: InventoryItem) =>
      update(items =>
        items.map(item =>
          item.id === updatedItem.id ? updatedItem : item
        )
      )
  };
}

export const inventory = createInventoryStore();

// Derived store to filter inventory based on the filter criteria
export const filteredInventory = derived(
  inventory,
  ($inventory) => (filter: InventoryFilter) =>
    $inventory.filter(item => {
      if (filter.type && item.type !== filter.type) return false;
      if (filter.category && item.category !== filter.category) return false;
      if (filter.available !== undefined && item.available !== filter.available) return false;
      if (filter.lowStock && item.quantity > item.minStock) return false;
      return true;
    })
);
