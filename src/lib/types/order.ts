export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  total: number;
  createdAt: Date;
  updatedAt: Date;
}