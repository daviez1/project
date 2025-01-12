import { deleteInventoryItem } from "$lib/server/services/inventory_services";
import { RequestHandler } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ params }) => {
    try {
        const id = params.id;
        if (!id) throw new Error('ID no proporcionado');
        
        const deletedItem = await deleteInventoryItem(id);
        return new Response(JSON.stringify({ message: 'Producto del inventario eliminado', deletedItem }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ message: 'Error al eliminar el producto en el inventario', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
