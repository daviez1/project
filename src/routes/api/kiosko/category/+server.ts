import { getKioskoCategories } from '$lib/server/services/kiosko_services';
import type { RequestHandler } from '@sveltejs/kit';
import {KioskoCategory} from '$lib/types/kiosko';
import { createKioskoCategory } from '../../../../lib/server/services/kiosko_services';

export const GET: RequestHandler = async () => {
  try {
    const kioskoCategories = await getKioskoCategories();
    return new Response(JSON.stringify({ kioskoCategories }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(`Error al obtener la categoría del producto en api: ${error}`);
    return new Response(JSON.stringify({ error: 'Error al obtener la categoría del producto en api' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: RequestHandler = async ({ request }) => {
    try { 
        const kioskoCategory: KioskoCategory = await request.json(); 
        const newKioskoCategory = await createKioskoCategory(kioskoCategory); 
        return new Response(JSON.stringify({ message: 'Categoria creada', category: newKioskoCategory }), 
        { status: 201, headers: { 'Content-Type': 'application/json' } }); 
    } catch (error:any) { 
        return new Response(JSON.stringify({ message: 'Error al crear la categoria del kiosko', error: error.message }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }); } 
    };