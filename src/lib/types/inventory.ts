import mongoose from "mongoose";

export interface InventoryItem {
    _id?: mongoose.Types.ObjectId
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    type: 'menu' | 'kiosk';
    category: 'entrantes' | 'platos fuertes' | 'acompañantes' | 'bebidas' | 'menu infantil' | 'especiales del dia' | 'vegetarianas' | 'Sin gluten/Sin lactosa' | 'postres';
    image: string;
    available: boolean;
    minStock: number;
    maxStock: number;
    lastRestocked: Date;
  }
  
  export interface InventoryFilter {
    type?: 'menu' | 'kiosk'| 'todos';
    category?: string;
    available?: boolean;
    lowStock?: boolean;
  }
  
  export interface StockUpdate {
    id: string;
    quantity: number;
    type: 'add' | 'remove';
  }