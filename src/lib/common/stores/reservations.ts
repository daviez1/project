import { writable, get } from 'svelte/store';
import type { Table, TimeSlot, TableReservation } from '$lib/types/reservation';

const reservations = writable<TableReservation[]>([]);
const tables = writable<Table[]>([]);

function createReservationStore() {
  const { subscribe, set, update } = writable<TableReservation[]>([]);

  return {
    subscribe,
    setReservations: (newReservations: TableReservation[]) => set(newReservations),
    addReservation: (reservation: TableReservation) => update(reservations => [...reservations, reservation]),
    cancelReservation: (reservationId: string) => update(reservations => reservations.filter(r => r.id !== reservationId)),
    getAvailableTimeSlots: (date: Date, guests: number) => {
      const reservationsForDate = get(reservations).filter((res: TableReservation) => res.startTime.toDateString() === date.toDateString());
      const allTables = get(tables);

      function getAvailableTablesForSlot(time: string): string[] {
        // Get tables already reserved for this time
        const reservedTableIds = reservationsForDate
          .filter((res: any) => res.time === time)
          .map((res: any) => res.tableId);

        // Find tables that can accommodate the group and aren't reserved
        return allTables
          .filter(table => 
            table.capacity >= guests && 
            !reservedTableIds.includes(table.id)
          )
          .map(table => table.id);
      }

      // Update availability for each time slot
      const updateSlots = (slots: TimeSlot[]): TimeSlot[] =>
        slots.map(slot => {
          const availableTables = getAvailableTablesForSlot(slot.time);
          return {
            ...slot,
            available: availableTables.length > 0,
            tables: allTables.filter(table => availableTables.includes(table.id))
          };
        });

      const lunchSlots: TimeSlot[] = []; // Define your lunch slots here
      const dinnerSlots: TimeSlot[] = []; // Define your dinner slots here

      return {
        lunch: updateSlots(lunchSlots),
        dinner: updateSlots(dinnerSlots)
      };
    },
    findTableForReservation: (date: Date, time: string, guests: number): string | null => {
      const availableSlots = this.getAvailableTimeSlots(date, guests);
      const slot = [...availableSlots.lunch, ...availableSlots.dinner].find(s => s.time === time);
      if (slot && slot.available) {
        const availableTable = slot.tables.find((table:Table) => table.capacity >= guests);
        return availableTable ? availableTable.id : null;
      }
      return null;
    }
  };
}

export const reservationStore = createReservationStore();
