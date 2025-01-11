import { a as getMenuCategory, c as createMenuCategory } from "../../../../../chunks/menu_services.js";
import "../../../../../chunks/index.js";
const GET = async () => {
  try {
    const menuCategories = await getMenuCategory();
    return new Response(
      JSON.stringify({ menuCategories }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error al conectar al obtener categorias de menu", error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
const POST = async ({ request }) => {
  try {
    const menuCategory = await request.json();
    const newMenuCategory = await createMenuCategory(menuCategory);
    return new Response(
      JSON.stringify({ message: "Categoria creada", category: newMenuCategory }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error al crear la categoria del plato", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
export {
  GET,
  POST
};
