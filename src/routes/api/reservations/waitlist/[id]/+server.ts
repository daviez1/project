import { RequestHandler } from "@sveltejs/kit";
import { deleteWaitlistEntry } from '$lib/server/services/waitlist_services';
import { ObjectId } from "mongodb";

export const DELETE: RequestHandler = async ({ params }) => {
    try {
        const id = new ObjectId( params.id );
        if (!id) throw new Error('ID no proporcionado');
        
        const deletedWaitlistEntry = await deleteWaitlistEntry(id);
        return new Response(JSON.stringify({ message: 'Reserva eliminada', deletedWaitlistEntry }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ message: 'Error al eliminar la reserva', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};