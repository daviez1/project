import { a as getOrderItem, u as updateOrderStatusBackend } from "../../../../../chunks/order_services.js";
import mongoose from "mongoose";
const GET = async (requestEvent) => {
  try {
    const orderId = requestEvent.params.id;
    const orderItem = await getOrderItem(orderId);
    return new Response(JSON.stringify({ Item: orderItem }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    throw new Error("Error al obtener pedidos");
  }
};
const PUT = async (requestEvent) => {
  try {
    const orderId = requestEvent.params.id;
    if (!orderId)
      throw new Error("Debe ingresar el id");
    const objectId = new mongoose.Types.ObjectId(orderId);
    const orderItemtoUpdate = await updateOrderStatusBackend(objectId);
    const response = new Response(JSON.stringify(orderItemtoUpdate), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.error("Error al actualizar el estado del pedido:", error);
    return new Response(JSON.stringify({ error: "Error al actualizar estado del pedido" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
export {
  GET,
  PUT
};
