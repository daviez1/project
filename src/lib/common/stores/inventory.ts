import { writable, derived } from 'svelte/store';
import type { InventoryItem, InventoryFilter, StockUpdate } from '$lib/types/inventory';

// Create the inventory store
function createInventoryStore() {
  const { subscribe, set, update } = writable<InventoryItem[]>([
    // Add some initial data here for testing
    { id: '1', name: 'Classic Burger', description: 'A delicious classic beef burger with lettuce, tomato, and cheese.', price: 8.99, quantity: 15, type: 'menu', category: 'burgers', image: 'classic-burger.jpg', available: true, minStock: 5, maxStock: 50, lastRestocked: new Date('2024-12-20') },
    { id: '2', name: 'Veggie Burger', description: 'A tasty veggie burger made with a blend of vegetables and spices.', price: 7.99, quantity: 8, type: 'menu', category: 'burgers', image: 'veggie-burger.jpg', available: true, minStock: 3, maxStock: 30, lastRestocked: new Date('2024-12-25') }, // Add more items as needed
    {id: '3', name: 'Margherita Pizza', description: 'A tasty veggie burger made with a blend of vegetables and spices.',price: 7.99,quantity: 8,type: 'menu',category: 'pizza',image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',available: true,minStock: 3,maxStock: 30,lastRestocked: new Date('2024-12-25')
    }
  ]);

  return {
    subscribe,
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
