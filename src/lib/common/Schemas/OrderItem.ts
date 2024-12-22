import mongoose from 'mongoose';

export const OrderItemSchema = new mongoose.Schema({
    menuItemId: { type: String, ref: 'MenuItem', required: true },
    name: { type: String, ref: 'MenuItem', required: true },
    quantity: { type: Number, required: true },
    notes: { type: String }
});

const OrderItem = mongoose.models.OrderItem || mongoose.model('OrderItem', OrderItemSchema);
export default OrderItem;