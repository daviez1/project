import type { OrderItem } from '$lib/types/order';
import { orders } from '$lib/common/stores/orders';

let orderCounter = 1;

export function createOrder(items: OrderItem[], total: number) {
  const order = {
    id: orderCounter.toString(),
    items,
    status: 'pending' as const,
    total,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  orders.addOrder(order);
  orderCounter++;
  
  // Simulate order status updates
  // setTimeout(() => updateOrderStatus(order.id, 'preparing'), 5000);
  // setTimeout(() => updateOrderStatus(order.id, 'ready'), 15000);
  // setTimeout(() => updateOrderStatus(order.id, 'completed'), 20000);
}

export function updateOrderStatus(orderId: string, status: 'pending' | 'preparing' | 'ready' | 'completed') {
  return orders.updateStatus(orderId, status);
}