import type { RequestHandler } from '@sveltejs/kit';
import * as ReservationsTypes from '$lib/types/reservation';
import { createReservation, getReservations } from '$lib/server/services/reservations_services';
import { dbConnect } from '$lib/server/config/db';

export const GET: RequestHandler = async () => {
    try {
        await dbConnect()
        return new Response(JSON.stringify({ reservations: await getReservations() }),
        {status: 200, headers: {'Content-Type': 'application/json'}});
    } catch (error) {
        throw new Error('Error al obtener reservas')
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