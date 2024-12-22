import type { MenuItem, MenuCategory } from '$lib/types/menu';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, and special sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    category: 'burgers',
    available: true
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella, and basil',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
    category: 'pizzas',
    available: true
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce, croutons, and Caesar dressing',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9',
    category: 'salads',
    available: true
  }
];

export const menuCategories: MenuCategory[] = [
  {
    id: 'burgers',
    name: 'Burgers',
    items: menuItems.filter(item => item.category === 'burgers')
  },
  {
    id: 'pizzas',
    name: 'Pizzas',
    items: menuItems.filter(item => item.category === 'pizzas')
  },
  {
    id: 'salads',
    name: 'Salads',
    items: menuItems.filter(item => item.category === 'salads')
  }
];

export const featuredItems = menuItems.slice(0, 3);

export function getMenuItem(id: string): MenuItem | undefined {
  return menuItems.find(item => item.id === id);
}