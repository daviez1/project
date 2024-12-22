import { getKioskoItem } from '$lib/server/services/kiosko_services';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (  ) => {
    try {
        return new Response(JSON.stringify({ kioskoProducts: await getKioskoItem() }),
        {status: 200, headers: {'Content-Type': 'application/json'}});
    } catch (error) {
        throw new Error('Error al obtener productos')
    }
};