import type{ WaitlistEntry } from "$lib/types/reservation";
import mongoose from "mongoose";

export const get = async (customFetch = fetch) => {
    const response = await customFetch('/api/reservations/waitlist');
    const waitlist = await response.json();
    return waitlist.waitlistEntries;
}

export const post = async (waitlist: WaitlistEntry, customFetch = fetch) => {
    const response = await customFetch('/api/reservations/waitlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(waitlist)
    });
    const result = await response.json();
    return result.newWaitlistEntry;
}

export const DELETE = async (id: mongoose.Types.ObjectId, customFetch = fetch) => {
    const response = await customFetch(`/api/reservations/waitlist/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) throw new Error('Error al eliminar el elemento del inventario');

    const result = await response.json();
    return result.deletedWaitlistEntry;
}
