import { getOrder, getOrderItem } from '$lib/server/services/order_services';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (  ) => {
    try {
        return new Response(JSON.stringify({ Pedidos: await getOrderItem() }),
        {status: 200, headers: {'Content-Type': 'application/json'}});
    } catch (error) {
        throw new Error('Error al obtener productos')
    }
};