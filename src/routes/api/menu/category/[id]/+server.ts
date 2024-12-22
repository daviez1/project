import { getMenuCategoryById } from '$lib/server/services/menu_services';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ( requestEvent: RequestEvent ) => {
    try {
        const { id } = requestEvent.params
        return new Response(JSON.stringify({kioskoProductById: await getMenuCategoryById( id )}),
        {status: 200, headers: {'Content-Type': 'application/json'}});
    } catch (error) {
        throw new Error('Error al obtener la categoria')
    }
};