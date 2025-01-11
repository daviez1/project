import "./MenuItem.js";
import mongoose from "mongoose";
import { d as dbConnect } from "./db.js";
import { s as statusPlusBackend } from "./statusPlus.js";
const OrderItemSchema = new mongoose.Schema({
  menuItemId: { type: String, ref: "MenuItem", required: true },
  name: { type: String, ref: "MenuItem", required: true },
  quantity: { type: Number, required: true },
  notes: { type: String }
});
const OrderItem = mongoose.models.OrderItem || mongoose.model("OrderItem", OrderItemSchema);
const OrderSchema = new mongoose.Schema({
  id: { type: String, required: true },
  items: [{ type: OrderItemSchema, required: true }],
  status: { type: String, enum: ["pending", "preparing", "ready", "completed"], required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
const getOrder = async () => {
  try {
    await dbConnect();
    const orders = await Order.find();
    return orders;
  } catch (error) {
    throw new Error(`Error al obtener pedidos: ${error}`);
  }
};
const getOrderItem = async (id) => {
  try {
    await dbConnect();
    const orderItem = await OrderItem.findOne({ menuItemId: id });
    return orderItem;
  } catch (error) {
    throw new Error(`Error al obtener pedidos: ${error}`);
  }
};
const updateOrderStatusBackend = async (orderId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(orderId))
      throw new Error("Invalid orderId");
    const order = await Order.findById(orderId);
    if (!order)
      throw new Error("Order not found");
    const newStatus = statusPlusBackend(order.status);
    const orderUpdated = await Order.findByIdAndUpdate(
      orderId,
      { status: newStatus, updatedAt: /* @__PURE__ */ new Date() },
      { new: true }
      // Para devolver el documento actualizado
    );
    if (!orderUpdated)
      throw new Error("Order not found");
    await orderUpdated.save();
    return orderUpdated;
  } catch (error) {
    console.error("Error al actualizar el estado del pedido:", error);
    throw new Error("Error al actualizar el estado del pedido");
  }
};
async function createOrder(order) {
  try {
    const newOrder = await Order.create(order);
    return newOrder;
  } catch (error) {
    throw new Error("Error al crear el pedido");
  }
}
export {
  getOrderItem as a,
  createOrder as c,
  getOrder as g,
  updateOrderStatusBackend as u
};
