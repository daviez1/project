import { writable } from 'svelte/store';
import type { OrderItem } from '$lib/types/order';
import * as ApiMenuItems from '../api/menuItems';
import * as ApiMenuCategory from '../api/menuCategories';
import * as ApiKioskoCategory from '../api/kioskoCategories';

function createCartStore() {
  const { subscribe, set, update } = writable<OrderItem[]>([]);

  return {
    subscribe,
    fetchMenuItems: async() => await ApiMenuItems.get(),
    fetchMenuItemsById: async( id:string ) => await ApiMenuItems.search( id ),
    fetchMenuCategories: async() => await ApiMenuCategory.get(),
    fetchKioskoCategories: async() => await ApiKioskoCategory.get(),
    addItem: (item: OrderItem) => update(items => {
      const existingItemIndex = items.findIndex(i => i.menuItemId === item.menuItemId);
      
      if (existingItemIndex !== -1) {
        // Si el artículo ya existe, actualiza la cantidad
        const existingItem = items[existingItemIndex];
        const updatedItem = { ...existingItem, quantity: existingItem.quantity + item.quantity };
        return [
          ...items.slice(0, existingItemIndex),
          updatedItem,
          ...items.slice(existingItemIndex + 1)
        ];
      } else {
        // Si no existe, simplemente agrega el nuevo artículo
        return [...items, item];
      }
    }),
    removeItem: (menuItemId: string) => 
      update(items => items.filter(item => item.menuItemId !== menuItemId)),
    updateQuantity: (menuItemId: string, quantity: number) =>
      update(items => 
        items.map(item => 
          item.menuItemId === menuItemId 
            ? { ...item, quantity } 
            : item
        )
      ),
    clear: () => set([])
  };
}

export const cart = createCartStore();