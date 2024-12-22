import { getMenuCategory } from '$lib/server/services/menu_services';
import { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    try {
        const menuCategories = await getMenuCategory();
        return new Response(JSON.stringify({ menuCategories }),
        {status: 200, headers: {'Content-Type': 'application/json'}});
    } catch (error:any) {
        return new Response(JSON.stringify({ message: 'Error al conectar al obtener categorias de menu', error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};
