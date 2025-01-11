import { g as getOrder, c as createOrder } from "../../../../chunks/order_services.js";
import "mongoose";
import "../../../../chunks/index.js";
const GET = async () => {
  try {
    return new Response(
      JSON.stringify({ Pedidos: await getOrder() }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    throw new Error("Error al obtener productos");
  }
};
const POST = async ({ request }) => {
  try {
    const order = await request.json();
    const newOrder = await createOrder(order);
    return new Response(
      JSON.stringify({ message: "Pedido creado", order: newOrder }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error al crear el pedido", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
export {
  GET,
  POST
};
