import type{ TableReservation } from "$lib/types/reservation";

export const get = async (customFetch = fetch) => {
    const response = await customFetch('/api/reservations');
    const reservations = await response.json();
    return reservations.reservations;
}

export const post = async (reservation: TableReservation, customFetch = fetch) => {
    const response = await customFetch('/api/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservation)
    });
    const result = await response.json();
    return result.newReservation;
}
