import { TableReservation } from "$lib/common/Schemas/Reservations"
import * as ReservationTypes from "$lib/types/reservation";

export const getReservations = async() => {
    try {
        const reservations = await TableReservation.find();
        return reservations;
    } catch (error) {
        throw new Error(`error: ${error}`)
    }
}
export const createReservation = async( reservation: ReservationTypes.TableReservation ) => {
    try {
        const reservationCreated = await TableReservation.create( reservation );
        return reservationCreated;
    } catch (error) {
        console.log(error);
        throw new Error(`error: ${error}`)
    }
}