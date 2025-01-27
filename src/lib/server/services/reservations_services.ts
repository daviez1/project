import { TableReservation } from "$lib/common/Schemas/Reservations"
import * as ReservationTypes from "$lib/types/reservation";
import { dbConnect } from "../config/db";

export const getReservations = async() => {
    try {
        await dbConnect()
        const reservations = await TableReservation.find().populate('tableId');
        return reservations;
    } catch (error) {
        throw new Error(`error: ${error}`)
    }
}
export const createReservation = async( reservation: ReservationTypes.TableReservation ) => {
    try {
        await dbConnect()
        const reservationCreated = await TableReservation
        .create( reservation )
        return await reservationCreated.populate('tableId');
    } catch (error) {
        console.log(error);
        throw new Error(`error: ${error}`)
    }
}