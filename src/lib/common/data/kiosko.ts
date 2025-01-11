import type { KioskoItem, KioskoCategory } from '$lib/types/kiosko';

export function getKioskoItemQuery(id: string, kioskoItems:KioskoItem[]): KioskoItem | undefined {
  return kioskoItems.find((item:KioskoItem) => item.id === id); 
 } 