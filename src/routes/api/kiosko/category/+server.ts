import { getKioskoCategories } from '$lib/server/services/kiosko_services';
import type { RequestHandler } from '@sveltejs/kit';

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
