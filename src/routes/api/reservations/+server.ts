import { getInventoryItem } from '$lib/server/services/inventory_services';
import type { RequestHandler } from '@sveltejs/kit';
import * as ReservationsTypes from '$lib/types/reservation';
import { createReservation, getReservations } from '$lib/server/services/reservations_services';

export const GET: RequestHandler = async () => {
    try {
        return new Response(JSON.stringify({ reservations: await getReservations() }),
        {status: 200, headers: {'Content-Type': 'application/json'}});
    } catch (error) {
        throw new Error('Error al obtener productos del inventario')
    }
};

export const POST: RequestHandler = async ({ request }) => {
    try { 
        const reservation: ReservationsTypes.TableReservation = await request.json();
        const newReservation = await createReservation( reservation ); 
        return new Response(JSON.stringify({ message: 'Reservación creada con éxito', newReservation }), 
        { status: 201, headers: { 'Content-Type': 'application/json' } }); 
    } catch (error:any) { 
        return new Response(JSON.stringify({ message: 'Error al crear la reservación', error: error.message }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }); } 
    };