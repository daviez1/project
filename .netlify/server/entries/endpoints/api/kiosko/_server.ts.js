import { g as getKioskoItem } from "../../../../chunks/kiosko_services.js";
const GET = async () => {
  try {
    return new Response(
      JSON.stringify({ kioskoProducts: await getKioskoItem() }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    throw new Error("Error al obtener productos");
  }
};
export {
  GET
};
