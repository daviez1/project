import { getMenuItemById } from '$lib/server/services/menu_services';
import type { RequestEvent } from '@sveltejs/kit';

export const GET = async (requestEvent: RequestEvent) => {
    try {
        const menuId = requestEvent.params.id;
        const menuItem = await getMenuItemById(menuId);
        return new Response(JSON.stringify({ Item: menuItem }), {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ message: 'Error al conectar a la base de datos', error: error.message }), {
            status: 500,
            headers: {'Content-Type': 'application/json'}});
    }
};
