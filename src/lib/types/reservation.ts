import mongoose from "mongoose";

export interface WaitlistEntry {
  _id?: mongoose.Types.ObjectId;
  id: string;
  date: Date;
  preferredTimes: string[];
  guests: number;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  status?: 'waiting' | 'notified' | 'reserved' | 'expired' | 'confirmed';
  createdAt: Date;
}

export interface Table { 
  _id?: mongoose.Types.ObjectId;
  id: string;
  number: number;
  available: boolean;
  capacity: number;
  section: 'indoor' | 'outdoor';
}

export interface TableReservation {
  id: string;
  tableId: mongoose.Types.ObjectId;
  waitlistId: mongoose.Types.ObjectId;
  reservationId: string; 
  startTime: string; //era Date
  endTime: string; //era Date
  status: string;
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
export interface ReservationModification {
  reservationId: string;
  type: 'cancel' | 'modify';
  newDate?: Date;
  newTime?: string;
  newGuests?: number;
  reason?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  tables: Table[];
}