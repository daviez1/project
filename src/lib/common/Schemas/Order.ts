import mongoose from 'mongoose';
import { OrderItemSchema } from './OrderItem';

const OrderSchema = new mongoose.Schema({
    id: { type: String, required: true },
    items: [{ type: OrderItemSchema, required: true }],
    status: { type: String, enum: ['pending', 'preparing', 'ready', 'completed'], required: true },
    total: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
export default Order;
