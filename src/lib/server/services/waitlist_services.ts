import {
  TableReservation,
  WaitlistEntry,
} from "$lib/common/Schemas/Reservations";
import * as ReservationTypes from "$lib/types/reservation";
import mongoose from "mongoose";
import { Table } from "$lib/common/Schemas/Table";
import { createReservationFromWaitlistEntry, getReservations } from "./reservations_services";

export const getWaitlistEntries = async () => {
  try {
    const waitlistEntries = await WaitlistEntry.find();
    return waitlistEntries;
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
};

export const createWaitlistEntry = async (
  waitlist: ReservationTypes.WaitlistEntry
) => {
  try {
    const items = await WaitlistEntry.find();
    const itemsId = String(items.length + 1);

    waitlist.id = itemsId;
    const availableTable = await findAvailableTable(waitlist);
    const availableTableReservation = await findAvailableTableReservation(waitlist);
    const waitlistEntryCreated = await WaitlistEntry.create(waitlist);

    if (availableTable && availableTableReservation ) {
      const reservation = await createReservationFromWaitlistEntry(
        waitlistEntryCreated,
        availableTable
      );
      waitlistEntryCreated.status = "reserved";
      if (!reservation) throw new Error("Reservación null");

      await notifyCustomer(waitlist.email, reservation, "reservation");
      waitlistEntryCreated.save();
      return reservation;
    } else {
      await notifyCustomer(waitlist.email, waitlist, "waitlist");
      return waitlistEntryCreated;
   }
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
};

export const deleteWaitlistEntry = async (id: mongoose.Types.ObjectId) => {
  try {
    const waitlistToDelete = await WaitlistEntry.findByIdAndDelete(id);
    const reservationDeleted = await TableReservation.findOneAndDelete({
      waitlistId: id,
    });
    if (reservationDeleted) {
      const tableReservationDeleted = await Table.findById(
        reservationDeleted.tableId
      );

      const waitlistEntries = await WaitlistEntry.find({ status: "waiting" });
      const matchingEntry = waitlistEntries.find(
        (entry) => entry.guests <= tableReservationDeleted.capacity
      );

      await WaitlistEntry.findByIdAndUpdate(matchingEntry._id, {
        status: "reserved",
      });

      console.log(`matchingEntry: ${matchingEntry}`);

      const newReservation = await createReservationFromWaitlistEntry(
        matchingEntry,
        tableReservationDeleted
      );
      console.log(`newReservation>${newReservation}`);
      await notifyCustomer(matchingEntry.email, newReservation, "reservation");
    }
    return waitlistToDelete;
  } catch (error) {
    console.log(error);
    throw new Error(`error: ${error}`);
  }
};

async function handleCancellation(reservationId: string) {
  const reservation = await TableReservation.findById(reservationId);
  if (!reservation) throw new Error("Reserva no encontrada");

  const waitlistEntries = await WaitlistEntry.find({ status: "waiting" });
  const matchingEntry = waitlistEntries.find(
    (entry) => entry.guests <= reservation.capacity
  );

  if (matchingEntry) {
    const newReservation = await createReservationFromWaitlistEntry(
      matchingEntry,
      reservation.tableId
    );
    await TableReservation.create(newReservation);
    await WaitlistEntry.findByIdAndUpdate(matchingEntry._id, {
      status: "reserved",
    });
    await notifyCustomer(matchingEntry.email, newReservation, "reservation");
  }
}

export async function findAvailableTable(
  entry: ReservationTypes.WaitlistEntry
): Promise<ReservationTypes.Table | null> {
  const availableTables = await Table.findOne({
    available: true,
    capacity: { $gte: entry.guests },
  }); //$gte: entry.guests mayor o igual

  return availableTables ? availableTables : null;
}

export async function findAvailableTableReservation(
  entry: ReservationTypes.WaitlistEntry
): Promise<boolean> {

  let availableTableReservation = false

  // Extrae la fecha y la hora
  const selectedDate = new Date(entry.date);
  const tableReservations:any = await TableReservation.find().populate('waitlistId')
  
  for (const preferred of entry.preferredTimes) {
      const selectedTime = preferred;
      
      // Combina la fecha y la hora
      const [hours, minutes] = selectedTime.split(":").map(Number);
      selectedDate.setHours(hours, minutes);
          
      for (const reservation of tableReservations) {
        if (reservation.waitlistId.date.toISOString() === selectedDate.toISOString()) {
          return availableTableReservation = true
        }
    }
}
  return availableTableReservation;
}


async function notifyCustomer(
  email: string,
  data: any,
  type: "reservation" | "waitlist"
) {
  // Implementa la lógica para notificar al cliente
  console.log("Todo con nodemailer");
}
