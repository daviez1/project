  import {
    TableReservation,
    WaitlistEntry,
  } from "$lib/common/Schemas/Reservations";
  import * as ReservationTypes from "$lib/types/reservation";
  import mongoose from "mongoose";
  import { Table } from "$lib/common/Schemas/Table";
  import { createReservationFromWaitlistEntry } from "./reservations_services";

  export const getWaitlistEntries = async () => {
    try {
      const waitlistEntries = await WaitlistEntry.find();
      return waitlistEntries;
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  };
  export const createWaitlistEntry = async ( waitlist: ReservationTypes.WaitlistEntry) => {
    try {
      const items = await WaitlistEntry.find();
      const itemsId = String(items.length + 1);

      waitlist.id = itemsId;
      const availableTable = await findAvailableTable(waitlist);
      const waitlistEntryCreated = await WaitlistEntry.create(waitlist);
      
      if (availableTable) {
        const reservation = await createReservationFromWaitlistEntry( waitlistEntryCreated, availableTable);
        if (!reservation) throw new Error("Reservación null");

        await notifyCustomer(waitlist.email, reservation, "reservation");
        return reservation;
      } else {
        await notifyCustomer(waitlist.email, waitlist, "waitlist");
        return waitlistEntryCreated;
      }
    } catch (error) {
      console.log(error);
      throw new Error(`error: ${error}`);
    }
  };

  export const deleteWaitlistEntry = async (id: mongoose.Types.ObjectId) => {
    try {
      const waitlistToDelete = await WaitlistEntry.findByIdAndDelete(id);
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

  async function handleReservationRequest(entry: ReservationTypes.WaitlistEntry) {
    const availableTable = await findAvailableTable(entry);

    if (availableTable) {
      const reservation = await createReservationFromWaitlistEntry(
        entry,
        availableTable
      );
      await TableReservation.create(reservation);
      await notifyCustomer(entry.email, reservation, "reservation");
    } else {
      await WaitlistEntry.create(entry);
      await notifyCustomer(entry.email, entry, "waitlist");
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

  async function notifyCustomer(
    email: string,
    data: any,
    type: "reservation" | "waitlist"
  ) {
    // Implementa la lógica para notificar al cliente
    console.log("Todo con nodemailer");
  }
