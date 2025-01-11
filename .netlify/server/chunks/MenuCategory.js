import mongoose from "mongoose";
const MenuCategorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }]
});
const MenuCategory = mongoose.models.MenuCategory || mongoose.model("MenuCategory", MenuCategorySchema);
export {
  MenuCategory as M
};
