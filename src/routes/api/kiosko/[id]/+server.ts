import { getKioskoItemById } from '$lib/server/services/kiosko_services';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ( requestEvent: RequestEvent ) => {
    try {
        const { id } = requestEvent.params
        return new Response(JSON.stringify({kioskoProductById: await getKioskoItemById( id )}),
        {status: 200, headers: {'Content-Type': 'application/json'}});
    } catch (error) {
        throw new Error('Error al obtener el producto')
    }
};