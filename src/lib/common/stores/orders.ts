import { writable } from 'svelte/store';
import type { Order } from '$lib/types/order';
import { get } from '../api/order';
import mongoose from 'mongoose';

function createOrdersStore() {
  const { subscribe, set, update } = writable<Order[]>([]);

  const post = async (order: Order) => {
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw new Error('Error al crear el pedido');
    }
    const newOrder = await response.json();
    update(orders => [...orders, newOrder.order]);
  };

  const updateStatus = async (id: mongoose.Types.ObjectId) => {
    const response = await fetch(`/api/order/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el estado del pedido');
    }
    const updatedOrder = await response.json();
    update(orders =>
      orders.map(order => order.id === updatedOrder.id ? updatedOrder : order));
  };

  const fetchOrders = async () => {
    const orders = await get();
    set(orders);
    return orders
  };

  return {
    subscribe,
    post,
    updateStatus,
    fetchOrders,
  };
}

export const orders = createOrdersStore();