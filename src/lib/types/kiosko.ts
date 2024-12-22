export interface KioskoItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    available: boolean;
  }
  
  export interface KioskoCategory {
    id: string;
    name: string;
    items: KioskoItem[];
  }