import { RequestHandler } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { deleteTable, updateAvailability, updateTable } from '$lib/server/services/table_services';
import type { Table } from "$lib/types/reservation";

export const DELETE: RequestHandler = async ({ params }) => {
    try {
        const id = new ObjectId( params.id );
        if (!id) throw new Error('ID no proporcionado');
        
        const deletedTable = await deleteTable(id);
        return new Response(JSON.stringify({ message: 'Mesa eliminada', deletedTable }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ message: 'Error al eliminar la mesa', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

export const PATCH: RequestHandler = async ({ params }) => {
    try {
        const id = new ObjectId( params.id );
        if (!id) throw new Error('ID no proporcionado');
        
        const updatedTable = await updateAvailability(id);
        return new Response(JSON.stringify({ message: 'Disponibilidadd de la mesa modificada', updatedTable }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ message: 'Error al modificar la disponibilidad de la mesa', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

export const PUT: RequestHandler = async ({ params, request }) => {
    try {
        const id = new ObjectId( params.id );
        if (!id) throw new Error('ID no proporcionado');
        
        const table: Table = await request.json()

        const updatedTable = await updateTable( id, table );
        return new Response(JSON.stringify({ message: 'Mesa modificada', updatedTable }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ message: 'Error al modificar la mesa', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};