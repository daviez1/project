import type { KioskoItem, KioskoCategory } from '$lib/types/kiosko';

export const kioskoItems: KioskoItem[] = [
  {
    id: 'store-1',
    name: 'Chocolate Chip Cookies',
    description: 'Pack of 12 freshly baked cookies',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e',
    category: 'cookies',
    available: true
  },
  {
    id: 'store-2',
    name: 'Mixed Nuts',
    description: 'Premium roasted nuts selection',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1536591375315-4c2b939d0756',
    category: 'nuts',
    available: true
  },
  {
    id: 'store-3',
    name: 'Potato Chips',
    description: 'Classic salted potato chips',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b',
    category: 'chips',
    available: true
  },
  {
    id: 'store-4',
    name: 'Gummy Bears',
    description: 'Assorted fruit flavored gummies',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f',
    category: 'candy',
    available: true
  },
  {
    id: 'store-5',
    name: 'Dark Chocolate Bar',
    description: '70% cocoa premium chocolate',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919',
    category: 'chocolate',
    available: true
  },
  {
    id: 'store-6',
    name: 'Trail Mix',
    description: 'Nuts, dried fruits, and chocolate mix',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1594489428504-5c0c480a15fd',
    category: 'nuts',
    available: true
  }
];

export const kioskoCategories: KioskoCategory[] = [
  {
    id: 'cookies',
    name: 'Cookies & Baked Goods',
    items: kioskoItems.filter(item => item.category === 'cookies')
  },
  {
    id: 'nuts',
    name: 'Nuts & Trail Mixes',
    items: kioskoItems.filter(item => item.category === 'nuts')
  },
  {
    id: 'chips',
    name: 'Chips & Savory Snacks',
    items: kioskoItems.filter(item => item.category === 'chips')
  },
  {
    id: 'candy',
    name: 'Candy & Sweets',
    items: kioskoItems.filter(item => 
      item.category === 'candy' || item.category === 'chocolate'
    )
  }
];

export const featuredItems = kioskoItems.slice(0, 3);

export function getKioskoItem(id: string): KioskoItem | undefined {
  return kioskoItems.find(item => item.id === id);
}

export function getKioskoItemQuery(id: string, kioskoItems:KioskoItem[]): KioskoItem | undefined {
  return kioskoItems.find((item:KioskoItem) => item.id === id); 
 } 