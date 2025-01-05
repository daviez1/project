import { getOrder, getOrderItem, updateOrderStatusBackend } from '$lib/server/services/order_services';
import type { RequestHandler, RequestEvent } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const GET: RequestHandler = async ( requestEvent: RequestEvent ) => {
    try {
        const orderId = requestEvent.params.id;
        const orderItem = await getOrderItem(orderId);
        return new Response(JSON.stringify({ Item: orderItem }), {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        });
    } catch (error) {
        throw new Error('Error al obtener pedidos')
    }
};

export const PUT: RequestHandler = async (requestEvent) => {
    try {
        const orderId = requestEvent.params.id;
        if (!orderId) {
            throw new Error('Debe ingresar el id');
        }

        // Convierte el id a ObjectId
        const objectId = new mongoose.Types.ObjectId(orderId);

        const orderItemtoUpdate = await updateOrderStatusBackend(objectId);
        return new Response(JSON.stringify({ Item: orderItemtoUpdate }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error al actualizar el estado del pedido:', error);
        return new Response(JSON.stringify({ error: 'Error al actualizar estado del pedido' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
