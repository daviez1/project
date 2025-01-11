import { I as InventoryItem } from "../../../../../../../chunks/InventoryItem.js";
import "mongoose";
const PUT = async ({ params, request }) => {
  try {
    const id = params.id;
    const itemStockUpdate = await request.json();
    const item = await InventoryItem.findById(id);
    if (!item)
      return new Response(JSON.stringify({ error: "Producto no encontrado" }), { status: 404 });
    item.quantity = itemStockUpdate.type === "add" ? item.quantity + itemStockUpdate.quantity : Math.max(0, item.quantity - itemStockUpdate.quantity);
    item.lastRestocked = itemStockUpdate.type === "add" ? /* @__PURE__ */ new Date() : item.lastRestocked;
    await item.save();
    return new Response(JSON.stringify(item), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al actualizar el stock" }), { status: 500 });
  }
};
export {
  PUT
};
