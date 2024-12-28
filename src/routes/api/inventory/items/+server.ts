import { getInventoryItem } from '$lib/server/services/inventory_services';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (  ) => {
    try {
        return new Response(JSON.stringify({ inventoryItems: await getInventoryItem() }),
        {status: 200, headers: {'Content-Type': 'application/json'}});
    } catch (error) {
        throw new Error('Error al obtener productos del inventario')
    }
};