import mongoose from 'mongoose';

const KioskoItemSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    available: { type: Boolean, required: true }
});

const KioskoItem = mongoose.models.KioskoItem || mongoose.model('KioskoItem', KioskoItemSchema);
export default KioskoItem;
