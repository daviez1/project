import type { RequestHandler } from '@sveltejs/kit';
import * as ReservationsTypes from '$lib/types/reservation';
import { createWaitlistEntry, getWaitlistEntries } from '$lib/server/services/waitlist_services';

export const GET: RequestHandler = async () => {
    try {
        return new Response(JSON.stringify({ waitlistEntries: await getWaitlistEntries() }),
        {status: 200, headers: {'Content-Type': 'application/json'}});
    } catch (error) {
        throw new Error('Error al obtener solicitudas a la lista de espera')
    }
};

export const POST: RequestHandler = async ({ request }) => {
    try { 
        const waitlistEntry: ReservationsTypes.WaitlistEntry = await request.json();
        const newWaitlistEntry = await createWaitlistEntry( waitlistEntry ); 
        return new Response(JSON.stringify({ message: 'Reservación creada con éxito en la lista de espera', newWaitlistEntry }), 
        { status: 201, headers: { 'Content-Type': 'application/json' } }); 
    } catch (error:any) { 
        return new Response(JSON.stringify({ message: 'Error al crear la reservación en lalista de espera', error: error.message }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }); } 
    };