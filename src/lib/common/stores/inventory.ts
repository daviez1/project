import { writable, derived } from 'svelte/store';
import type { InventoryItem, InventoryFilter, StockUpdate } from '$lib/types/inventory';
import * as InventoryApi from "../api/inventoryItems";
import mongoose from 'mongoose';

// Create the inventory store
function createInventoryStore() {
  const { subscribe, set, update } = writable<InventoryItem[]>([]);

  const fetchInventoryItems = async () => {
    try {
      const items = await InventoryApi.get();
      if (items) {
        set(items);
      } else {
        console.error("No data returned from API");
      }
      return items
    } catch (error) {
      console.error("Error fetching inventory items:", error);
    }
  };

  const addInventoryItem = async (newInventoryItem: InventoryItem) => {
    const response = await fetch('/api/inventory/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInventoryItem),
    });
    if (!response.ok) {
      throw new Error('Error al crear el producto en el inventario');
    }
    const newItem = await response.json();
    update(inventory => {
      return [...inventory, newItem.newInventoryItem]
    });
    return newItem;
  };

  const updateStock = async (stockUpdate: StockUpdate, id:mongoose.Types.ObjectId) => {
    const response = await fetch(`/api/inventory/items/stocks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stockUpdate),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el stock');
    }
    const updatedItem = await response.json();
    update(items =>
      items.map(item =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  return {
    subscribe,
    fetchInventoryItems,
    addInventoryItem,
    updateStock,
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
