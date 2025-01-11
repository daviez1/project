import mongoose from "mongoose";
const MenuItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  available: { type: Boolean, required: true }
});
const MenuItem = mongoose.models.MenuItem || mongoose.model("MenuItem", MenuItemSchema);
export {
  MenuItem as M
};
