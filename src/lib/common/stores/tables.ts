import { writable, derived } from 'svelte/store';
import type { Table } from '$lib/types/reservation';
import { DELETE, get, PATCH, post, PUT } from '../api/tables';
import mongoose from 'mongoose';

function createTableStore() {
  const { subscribe, set, update } = writable<Table[]>([]);

  return {
    subscribe,
    get: async()=>{
        const tables = await get()
        set(tables)
        return tables 
    },
    add: async(table: Table) => {
      const newTable = await post( table );
      update(tables => [...tables, newTable]);
    },
    update: async (id: mongoose.Types.ObjectId, tableData: Table) => {
      const tableUpdated = await PUT( id, tableData )
      update(tables =>
        tables.map(table =>
          table._id === id ? table = tableUpdated : table
        )
      );
    },
    remove: async(id: mongoose.Types.ObjectId) => {
      await DELETE( id )
      update(tables => tables.filter(table => table._id !== id));
    },
    toggleAvailable: async(id: mongoose.Types.ObjectId) => {
      const tableToggleAvaible = await PATCH( id )  
      update(tables =>
        tables.map(table =>
          table._id === id ? tableToggleAvaible : table
        )
      );
    }
  };
}

export const tables = createTableStore();