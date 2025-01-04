import { getOrder, getOrderItem, updateOrderStatusBackend } from '$lib/server/services/order_services';
import type { RequestHandler, RequestEvent } from '@sveltejs/kit';

export const GET: RequestHandler = async ( requestEvent: RequestEvent ) => {
    try {
        const orderId = requestEvent.params.id;
        const orderItem = await getOrderItem(orderId);
        return new Response(JSON.stringify({ Item: orderItem }), {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        });
    } catch (error) {
        throw new Error('Error al obtener productos')
    }
};

export const PUT: RequestHandler = async ( requestEvent: RequestEvent ) => {
    try {
        const orderId:any = requestEvent.params.id;
        const orderItemtoUpdate = await updateOrderStatusBackend( orderId )
        return new Response(JSON.stringify({ Item: orderItemtoUpdate }), {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        });
    } catch (error) {
        throw new Error('Error al obtener productos')
    }
};