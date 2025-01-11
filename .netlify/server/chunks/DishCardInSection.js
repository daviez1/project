import { c as create_ssr_component, e as escape } from "./ssr.js";
import { c as capitalize } from "./capitalize.js";
import { d as animate__pulse_infinite } from "./animate.js";
const Menu_Kiosko = "";
const DishCardInSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { item } = $$props;
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  return `<div class="w-full rounded-lg shadow-md overflow-hidden mx-auto border flex flex-col bg-white"><div class="p-4 flex flex-col flex-grow h-fit"><div class="flex justify-between items-center mb-2"><h3 class="text-xl font-semibold capitalize">${escape(item.name)}</h3> <span class="text-lg font-bold">Precio: $${escape(item.price.toFixed(2))}</span> <button class="${"text-sm text-gray-500 hover:underline " + escape(animate__pulse_infinite, true)}">Ver imagen de ${escape(capitalize(item.name))}</button></div> <div class="flex justify-between items-center mb-1 flex-grow"><p class="text-gray-600 w-8/12">${escape(item.description)}</p> <button ${!item.available ? "disabled" : ""} class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed w-3/12">${escape(item.available ? "Pedir" : "Agotado")}</button></div></div></div> ${``}`;
});
export {
  DishCardInSection as D
};
