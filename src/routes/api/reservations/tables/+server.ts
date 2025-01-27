import type { RequestHandler } from '@sveltejs/kit';
import * as ReservationsTypes from '$lib/types/reservation';
import { createTable, getTables } from '$lib/server/services/table_services';
import { dbConnect } from '../../../../lib/server/config/db';

export const GET: RequestHandler = async () => {
    try {
        await dbConnect()
        return new Response(JSON.stringify({ tables: await getTables() }),
        {status: 200, headers: {'Content-Type': 'application/json'}});
    } catch (error) {
        throw new Error('Error al obtener las mesas')
    }
};

export const POST: RequestHandler = async ({ request }) => {
    try { 
        await dbConnect()
        const table: ReservationsTypes.Table = await request.json();
        const newTable = await createTable( table ); 
        return new Response(JSON.stringify({ message: 'Mesa creada con éxito', newTable }), 
        { status: 201, headers: { 'Content-Type': 'application/json' } }); 
    } catch (error:any) { 
        return new Response(JSON.stringify({ message: 'Error al crear la mesa', error: error.message }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }); } 
    };