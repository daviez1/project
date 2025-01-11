import { a as getKioskoCategories, c as createKioskoCategory } from "../../../../../chunks/kiosko_services.js";
const GET = async () => {
  try {
    const kioskoCategories = await getKioskoCategories();
    return new Response(JSON.stringify({ kioskoCategories }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error(`Error al obtener la categoría del producto en api: ${error}`);
    return new Response(JSON.stringify({ error: "Error al obtener la categoría del producto en api" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const POST = async ({ request }) => {
  try {
    const kioskoCategory = await request.json();
    const newKioskoCategory = await createKioskoCategory(kioskoCategory);
    return new Response(
      JSON.stringify({ message: "Categoria creada", category: newKioskoCategory }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error al crear la categoria del kiosko", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
export {
  GET,
  POST
};
