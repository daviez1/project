import { getOrder } from '$lib/server/services/order_services';
import type { RequestHandler } from '@sveltejs/kit';
import { Order, OrderItem } from '$lib/types/order';
import { RequestEvent } from "@sveltejs/kit";
import { createOrder } from '$lib/utils/orders';

export const GET: RequestHandler = async (  ) => {
    try {
        return new Response(JSON.stringify({ Pedidos: await getOrder() }),
        {status: 200, headers: {'Content-Type': 'application/json'}});
    } catch (error) {
        throw new Error('Error al obtener productos')
    }
};

export const POST: RequestHandler = async ({ request }) => {
    try { 
        const order: OrderItem[] = await request.json(); 
        const newOrder = await createOrder(order, 4); 
        return new Response(JSON.stringify({ message: 'Pedido creado', order: newOrder }), 
        { status: 201, headers: { 'Content-Type': 'application/json' } }); 
    } catch (error:any) { 
        return new Response(JSON.stringify({ message: 'Error al crear el pedido', error: error.message }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }); } };