import { createMenuCategory, getMenuCategory } from '$lib/server/services/menu_services';
import { RequestHandler } from '@sveltejs/kit';
import { MenuCategory } from "$lib/common/models/menu";

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

export const POST: RequestHandler = async ({ request }) => {
    try { 
        const menuCategory: MenuCategory = await request.json(); 
        const newMenuCategory = await createMenuCategory(menuCategory); 
        return new Response(JSON.stringify({ message: 'Categoria creada', category: newMenuCategory }), 
        { status: 201, headers: { 'Content-Type': 'application/json' } }); 
    } catch (error:any) { 
        return new Response(JSON.stringify({ message: 'Error al crear la categoria del plato', error: error.message }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }); } 
    };