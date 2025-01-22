import type { RequestHandler } from '@sveltejs/kit';
import InventoryItem from '$lib/common/Schemas/InventoryItem';
import * as InventoryTypes from '$lib/types/inventory.js';
import { updateStock } from '$lib/server/services/inventory_services';
import mongoose from 'mongoose';
import { mongo } from 'mongoose';
import { ObjectId } from 'mongodb';

export const PUT: RequestHandler = async ({ params, request }) => {
  try {
    const id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(params.id);
    const itemStockUpdate: InventoryTypes.StockUpdate = await request.json();
    
    const item = await updateStock( itemStockUpdate, id )
    return new Response(JSON.stringify(item), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al actualizar el stock' }), { status: 500 });
  }
};