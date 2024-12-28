import mongoose from 'mongoose';

const InventoryItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  type: { type: String, enum: ['menu', 'kiosk'], required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  available: { type: Boolean, required: true },
  minStock: { type: Number, required: true },
  maxStock: { type: Number, required: true },
  lastRestocked: { type: Date, required: true }
});

const InventoryItem = mongoose.models.InventoryItem || mongoose.model('InventoryItem', InventoryItemSchema);
export default InventoryItem;
