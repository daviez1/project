import { b as getMenuCategoryById } from "../../../../../../chunks/menu_services.js";
const GET = async (requestEvent) => {
  try {
    const { id } = requestEvent.params;
    return new Response(
      JSON.stringify({ kioskoProductById: await getMenuCategoryById(id) }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    throw new Error("Error al obtener la categoria");
  }
};
export {
  GET
};
