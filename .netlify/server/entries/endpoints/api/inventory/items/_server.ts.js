import { g as getInventoryItem, c as createInventoryItem } from "../../../../../chunks/inventory_services.js";
import "mongoose";
const GET = async () => {
  try {
    return new Response(
      JSON.stringify({ inventoryItems: await getInventoryItem() }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    throw new Error("Error al obtener productos del inventario");
  }
};
const POST = async ({ request }) => {
  try {
    const inventoryItem = await request.json();
    const newInventoryItem = await createInventoryItem(inventoryItem);
    return new Response(
      JSON.stringify({ message: "Producto del inventario creado", newInventoryItem }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error al crear el producto en el inventario", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
export {
  GET,
  POST
};
