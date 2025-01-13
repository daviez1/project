import type { ReservationSettings } from '$lib/types/reservation';

export const reservationSettings: ReservationSettings = {
  pricePerPerson: 450,
  maxDaysInAdvance: 90,
  minAge: 10,
  cancellationDays: 14,
  serviceTimes: {
    lunch: [
      { time: '13:00', available: true, tables: [] },
      { time: '13:30', available: true, tables: [] },
      { time: '14:00', available: true, tables: [] },
      { time: '14:30', available: true, tables: [] }
    ],
    dinner: [
      { time: '20:00', available: true, tables: [] },
      { time: '20:30', available: true, tables: [] },
      { time: '21:00', available: true, tables: [] },
      { time: '21:30', available: true, tables: [] }
    ]
  },
  maxGuestsPerTable: 8,
  minGuestsPerBooking: 1,
  maxGuestsPerBooking: 12
};