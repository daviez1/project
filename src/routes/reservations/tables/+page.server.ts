import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, getClientAddress }) => {
    const allowedIPs:string[] = ['::1'];
    const clientIP = getClientAddress();
    if (!allowedIPs.includes(clientIP)) throw error(403, { message: 'Acceso denegado: Tu IP no está autorizada.'}) 
    return {clientIP};
};
