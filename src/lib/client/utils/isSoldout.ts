import type { TableReservation } from "$lib/types/reservation";

export const isSoldout = (
  date: string,
  preferredTimes: string[],
  reservationStore: TableReservation[]
) => {
  let soldOut = true;
  
  preferredTimes.forEach((preferred: string) => {   
    for (const reservation of reservationStore) {
      if (
        typeof reservation.waitlistId !== "string" &&
        "date" in reservation.waitlistId
      ) {
        if (reservation.waitlistId.date.toString().split('T')[0] !== date) {
          soldOut = false;
          const index = preferredTimes.indexOf(preferred);
          if (index > -1) preferredTimes.splice(index, 1);
          preferredTimes.unshift(preferred);
        }
      }
    }
  });
  return {
    soldOut,
    preferredTimes,
    selectedDate: new Date(date),
  };
};
