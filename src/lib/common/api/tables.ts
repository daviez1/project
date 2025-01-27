import type{ Table } from "$lib/types/reservation";
import mongoose from "mongoose";

export const get = async (customFetch = fetch) => {
    const response = await customFetch('/api/reservations/tables');
    const tables = await response.json();
    return tables.tables;
}

export const post = async (table: Table, customFetch = fetch) => {
    const response = await customFetch('/api/reservations/tables', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(table)
    });
    const result = await response.json();
    return result.newTable;
}

export const DELETE = async (id: mongoose.Types.ObjectId, customFetch = fetch) => {
    const response = await customFetch(`/api/reservations/tables/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) throw new Error('Error al eliminar la mesa');

    const result = await response.json();
    return result.deletedTable;
}

export const PATCH = async (id: mongoose.Types.ObjectId, customFetch = fetch) => {
    const response = await customFetch(`/api/reservations/tables/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) throw new Error('Error al modificar la mesa');

    const result = await response.json();
    return result.updatedTable;
}

export const PUT = async (id: mongoose.Types.ObjectId, table: Table, customFetch = fetch) => {
    const response = await customFetch(`/api/reservations/tables/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(table)    
    });

    if (!response.ok) throw new Error('Error al modificar la mesa');

    const result = await response.json();
    return result.updatedTable;
}

