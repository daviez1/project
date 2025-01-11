import type { RequestHandler } from '@sveltejs/kit';
import InventoryItem from '$lib/common/Schemas/InventoryItem';
import * as InventoryTypes from '$lib/types/inventory.js';

export const PUT: RequestHandler = async ({ params, request }) => {
  try {
    const id = params.id;
    const itemStockUpdate: InventoryTypes.StockUpdate = await request.json();
    const item = await InventoryItem.findById(id);
    if (!item) return new Response(JSON.stringify({ error: 'Producto no encontrado' }), { status: 404 });
    
    item.quantity = itemStockUpdate.type === 'add' ? item.quantity + itemStockUpdate.quantity : Math.max(0, item.quantity - itemStockUpdate.quantity);
    item.lastRestocked = itemStockUpdate.type === 'add' ? new Date() : item.lastRestocked;

    await item.save();

    return new Response(JSON.stringify(item), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al actualizar el stock' }), { status: 500 });
  }
};