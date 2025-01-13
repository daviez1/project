export interface WaitlistEntry {
  id: string;
  date: Date;
  preferredTimes: string[];
  guests: number;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  status?: 'waiting' | 'notified' | 'reserved' | 'expired';
  createdAt: Date;
}

export interface CustomerPreferences {
  id: string;
  customerId: string;
  preferredSection: 'indoor' | 'outdoor';
  preferredTables: string[];
  dietaryRestrictions: string[];
  specialOccasions: {
    type: 'birthday' | 'anniversary' | 'other';
    date: Date;
    notes?: string;
  }[];
  notes: string;
}

export interface ReservationModification {
  reservationId: string;
  type: 'cancel' | 'modify';
  newDate?: Date;
  newTime?: string;
  newGuests?: number;
  reason?: string;
}

export interface ReservationSettings {
  pricePerPerson: number;
  maxDaysInAdvance: number;
  minAge: number;
  cancellationDays: number;
  serviceTimes: {
    lunch: Array<{
      time: string;
      available: boolean;
      tables: Array<any>;
    }>;
    dinner: Array<{
      time: string;
      available: boolean;
      tables: Array<any>;
    }>;
  };
  maxGuestsPerTable: number;
  minGuestsPerBooking: number;
  maxGuestsPerBooking: number;
}

export interface Table { 
  id: string;
  number: number;
  capacity: number;
  section: string;
}

export interface TableReservation {
  id: string;
  tableId: string;
  reservationId: string;
  startTime: Date;
  endTime: Date;
  status: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  tables: Table[];
}