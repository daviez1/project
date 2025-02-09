import { TableReservation, WaitlistEntry } from "$lib/common/Schemas/Reservations";
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
    const waitlistEntryCreated = await WaitlistEntry.create(waitlist);
    
    if ( availableTable && waitlistEntryCreated.status !== 'waiting' ) {
      const reservation = await createReservationFromWaitlistEntry(
        waitlistEntryCreated,
        availableTable
      );
      waitlistEntryCreated.status = "reserved";
      if (!reservation) throw new Error("Reservación null");

      await notifyCustomer(waitlist.email, reservation, "reservation");
      waitlistEntryCreated.save();
      return {
        reservation
      };
    } else {
      await notifyCustomer(waitlist.email, waitlist, "waitlist");
      return {
        waitlistEntryCreated
      };
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

      await WaitlistEntry.findByIdAndUpdate(matchingEntry._id, { status: "reserved"});

      const newReservation = await createReservationFromWaitlistEntry(
        matchingEntry,
        tableReservationDeleted
      );
      await notifyCustomer(matchingEntry.email, newReservation, "reservation");
    }
    return waitlistToDelete;
  } catch (error) {
    console.log(error);
    throw new Error(`error: ${error}`);
  }
};

export async function findAvailableTable(
  entry: ReservationTypes.WaitlistEntry
): Promise<ReservationTypes.Table | null> {
    
  const availableTable = await Table.findOne({
    available: true,
    capacity: { $gte: entry.guests },
  }); //$gte: entry.guests mayor o igual

  return availableTable ? availableTable : null;
}

async function notifyCustomer(
  email: string,
  data: any,
  type: "reservation" | "waitlist"
) {
  console.log("Todo con nodemailer");
}

