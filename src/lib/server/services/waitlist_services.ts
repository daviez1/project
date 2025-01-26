import { WaitlistEntry } from "$lib/common/Schemas/Reservations"
import * as ReservationTypes from "$lib/types/reservation";
import mongoose from "mongoose";

export const getWaitlistEntries = async() => {
    try {
        const waitlistEntries = await WaitlistEntry.find();
        return waitlistEntries;
    } catch (error) {
        throw new Error(`error: ${error}`)
    }
}
export const createWaitlistEntry = async( waitlist: ReservationTypes.WaitlistEntry ) => {
    try {
        const items = await WaitlistEntry.find();
        const itemsId = String(items.length + 1);

        waitlist.id = itemsId  
        const waitlistEntryCreated = await WaitlistEntry.create( waitlist );
        return waitlistEntryCreated;
    } catch (error) {
        console.log(error);
        throw new Error(`error: ${error}`)
    }
}
export const deleteWaitlistEntry = async( id: mongoose.Types.ObjectId ) => {
    try {
        const waitlistToDelete = await WaitlistEntry.findByIdAndDelete(id)
        return waitlistToDelete;
    } catch (error) {
        console.log(error);
        throw new Error(`error: ${error}`)
    }
}