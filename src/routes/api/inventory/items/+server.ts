import { getInventoryItem } from '$lib/server/services/inventory_services';
import type { RequestHandler } from '@sveltejs/kit';
import InventoryItem from '$lib/common/Schemas/InventoryItem';
import * as InventoryItemTypes from '$lib/types/inventory';
import { createInventoryItem } from '../../../../lib/server/services/inventory_services';

export const GET: RequestHandler = async (  ) => {
    try {
        return new Response(JSON.stringify({ inventoryItems: await getInventoryItem() }),
        {status: 200, headers: {'Content-Type': 'application/json'}});
    } catch (error) {
        throw new Error('Error al obtener productos del inventario')
    }
};

export const POST: RequestHandler = async ({ request }) => {
    try { 
        const inventoryItem: InventoryItemTypes.InventoryItem = await request.json(); 
        
        const newInventoryItem = await createInventoryItem(inventoryItem); 
        return new Response(JSON.stringify({ message: 'Producto del inventario creado', newInventoryItem }), 
        { status: 201, headers: { 'Content-Type': 'application/json' } }); 
    } catch (error:any) { 
        return new Response(JSON.stringify({ message: 'Error al crear el producto en el inventario', error: error.message }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }); } 
    };