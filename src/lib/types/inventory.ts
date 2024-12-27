export interface InventoryItem {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    type: 'menu' | 'kiosk';
    category: string;
    image: string;
    available: boolean;
    minStock: number;
    maxStock: number;
    lastRestocked: Date;
  }
  
  export interface InventoryFilter {
    type?: 'menu' | 'kiosk';
    category?: string;
    available?: boolean;
    lowStock?: boolean;
  }
  
  export interface StockUpdate {
    id: string;
    quantity: number;
    type: 'add' | 'remove';
  }