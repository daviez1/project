import { g as getMenuItems } from "../../../../chunks/menu_services.js";
const GET = async () => {
  try {
    return new Response(
      JSON.stringify({ menuItems: await getMenuItems() }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error al conectar a la base de datos", error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
export {
  GET
};
