// src/routes/api/test-db.js
import { getMenuItems } from '$lib/server/services/menu_services';

export const GET = async () => {
    try {
        // console.log('Resultado de la consulta:', menuItem);
        return new Response(JSON.stringify({ menuItems: await getMenuItems()}),
        {status: 200, headers: {'Content-Type': 'application/json'}});
    } catch (error:any) {
        return new Response(JSON.stringify({ message: 'Error al conectar a la base de datos', error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};
