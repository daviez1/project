import { InventoryItem } from "$lib/types/inventory";

export let inventoryItems = [{
    id: '1',
    name: 'Classic Burger',
    description: 'A delicious classic beef burger with lettuce, tomato, and cheese.',
    price: 8.99,
    quantity: 15,
    type: 'menu',
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    available: true,
    minStock: 5,
    maxStock: 50,
    lastRestocked: new Date('2024-12-20')
  },
  {
    id: '2',
    name: 'Veggie Burger',
    description: 'A tasty veggie burger made with a blend of vegetables and spices.',
    price: 7.99,
    quantity: 8,
    type: 'menu',
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    available: true,
    minStock: 3,
    maxStock: 30,
    lastRestocked: new Date('2024-12-25')
  },
  {
    id: '3',
    name: 'Margherita Pizza',
    description: 'A tasty veggie burger made with a blend of vegetables and spices.',
    price: 7.99,
    quantity: 8,
    type: 'menu',
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    available: true,
    minStock: 3,
    maxStock: 30,
    lastRestocked: new Date('2024-12-25')
  }
  ]