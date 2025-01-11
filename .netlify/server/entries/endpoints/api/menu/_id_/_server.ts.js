import { d as getMenuItemById } from "../../../../../chunks/menu_services.js";
const GET = async (requestEvent) => {
  try {
    const menuId = requestEvent.params.id;
    const menuItem = await getMenuItemById(menuId);
    return new Response(JSON.stringify({ Item: menuItem }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error al conectar a la base de datos", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
export {
  GET
};
