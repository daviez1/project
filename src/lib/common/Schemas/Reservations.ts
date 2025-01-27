import mongoose from 'mongoose';

const WaitlistEntrySchema = new mongoose.Schema({
  id: { type: String, required: true },
  date: { type: Date, required: true },
  preferredTimes: { type: [String], required: true },
  guests: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String },
  status: { type: String, enum: ['waiting', 'notified', 'reserved', 'expired'], default: 'waiting' },
  createdAt: { type: Date, default: Date.now }
});

const TableReservationSchema = new mongoose.Schema({
  id: { type: String, required: true },
  tableId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' , required: true }],
  reservationId: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  status: { type: String, enum: ['reserved', 'available'], default: 'reserved' }
});

const WaitlistEntry = mongoose.models.WaitlistEntry || mongoose.model('WaitlistEntry', WaitlistEntrySchema);
const TableReservation = mongoose.models.TableReservation || mongoose.model('TableReservation', TableReservationSchema);

export { WaitlistEntry, TableReservation };
