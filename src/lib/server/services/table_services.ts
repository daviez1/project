import { Table } from "$lib/common/Schemas/Table"
import * as ReservationTypes from "$lib/types/reservation";
import mongoose from "mongoose";

export const getTables = async() => {
    try {
        const tables = await Table.find();
        return tables;
    } catch (error) {
        throw new Error(`error: ${error}`)
    }
}
export const createTable = async( table: ReservationTypes.Table ) => {
    try {
        const tables = await Table.find();
        const tablesId = String(tables.length + 1);

        table.id = tablesId  
        const tableCreated = await Table.create( table );
        return tableCreated;
    } catch (error) {
        console.log(error);
        throw new Error(`error: ${error}`)
    }
}
export const deleteTable = async( id: mongoose.Types.ObjectId ) => {
    try {
        const tableToDelete = await Table.findByIdAndDelete(id)
        return tableToDelete;
    } catch (error) {
        console.log(error);
        throw new Error(`error: ${error}`)
    }
}

export const updateAvailability = async (id: mongoose.Types.ObjectId) => {
    try {
        const itemToUpdate = await Table.findById(id);
        if (!itemToUpdate) throw new Error('Mesa no encontrada');
        
        itemToUpdate.available = !itemToUpdate.available
        await itemToUpdate.save(); // Guarda el objeto actualizado

        return itemToUpdate;
    } catch (error: any) {
        throw new Error(`Error al actualizar la disponibilidad: ${error.message}`);
    }
};
