import mongoose from 'mongoose';

const TableSchema = new mongoose.Schema({
  id: { type: String, required: true },
  number: { type: Number, required: true },
  capacity: { type: Number, required: true },
  section: { type: String, required: true }
});

export const Table = mongoose.models.Table || mongoose.model('Table', TableSchema);

