import type { Action } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {  };
}) satisfies PageServerLoad;

// export const POST:Action = async ( {request} ) =>{
//     const formData = request.formData()
// }