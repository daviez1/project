import { TableReservation, WaitlistEntry } from "$lib/common/Schemas/Reservations"
import { Table } from "$lib/common/Schemas/Table";
import * as ReservationTypes from "$lib/types/reservation";
import { dbConnect } from "../config/db";

export const getReservations = async() => {
    try {
        await dbConnect()
        const reservations = await TableReservation.find().populate('tableId').populate('reservationId');
        return reservations;
    } catch (error) {
        throw new Error(`error: ${error}`)
    }
}

export const createReservation = async (reservation: ReservationTypes.TableReservation) => {
  try {
    await dbConnect();
    const reservations = await TableReservation.find();
    const reservationId = String(reservations.length + 1);

    reservation.id = reservationId  
    
    const reservationCreated = await TableReservation.create(reservation);
    const populatedReservation = await TableReservation.findById(reservationCreated._id)
    .populate('tableId')
    .populate('waitlistId');
    return populatedReservation;
  } catch (error) {
    console.log(error);
    throw new Error(`error: ${error}`);
  }
};


export async function createReservationFromWaitlistEntry(entry: ReservationTypes.WaitlistEntry, table: ReservationTypes.Table): Promise<ReservationTypes.TableReservation | null > {
  await dbConnect();
  const reservations = await TableReservation.find();
  const reservationId = String(reservations.length + 1);
   
  if (entry._id && table._id){ 
      const reservation = {
          id: reservationId,
          tableId: table._id,
          waitlistId: entry._id,
          reservationId: entry.id,
          startTime: entry.preferredTimes[0],
          endTime: entry.preferredTimes[0],
          status: 'reserved'
        }
        const reservationCreated = await TableReservation.create(reservation);
        const populatedReservation = await TableReservation.findById(reservationCreated._id)
        .populate('tableId')
        .populate('waitlistId');
        return populatedReservation
  }else return null
}  