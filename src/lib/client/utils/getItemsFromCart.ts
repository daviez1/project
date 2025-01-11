import type { MenuItem } from '$lib/types/menu';
import type { KioskoItem } from '$lib/types/kiosko';

export const getMenuItem = (id: string, menuItems:MenuItem[]): MenuItem | undefined => menuItems.find((item:MenuItem) => item.id === id); 
  
export const getKioskoItem = (id: string, kioskoItems:KioskoItem[]): KioskoItem | undefined => kioskoItems.find((item:KioskoItem) => item.id === id); 
 