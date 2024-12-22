import { writable } from 'svelte/store';
import type { Order } from '$lib/types/order';
import { get } from '../api/order';

function createOrdersStore() {
  const { subscribe, set, update } = writable<Order[]>([]);

  const post = async (order: Order) => {
     const response = await fetch('/api/orders', {
       method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(order), });
        if (!response.ok) { throw new Error('Error al crear el pedido'); } 
        const newOrder = await response.json(); 
        update(orders => [...orders, newOrder]); 
      };

  return {
    subscribe,
    getOrder: async() => await get(), 
    addOrderDB: post,
    addOrder: (order: Order) => update(orders => [...orders, order]),
    updateStatus: (orderId: string, status: Order['status']) =>
      update(orders =>
        orders.map(order =>
          order.id === orderId
            ? { ...order, status, updatedAt: new Date() }
            : order
        )
      )
  };
}

export const orders = createOrdersStore();