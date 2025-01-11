import { c as create_ssr_component, a as subscribe, v as validate_component, e as escape, d as each } from "../../../chunks/ssr.js";
import { C as Cart } from "../../../chunks/ButtonSeeOrders.svelte_svelte_type_style_lang.js";
import { a as createQuery, h as GetCategoryItems, c as cart, L as Loader } from "../../../chunks/Loader.js";
import { D as DishCardInSection } from "../../../chunks/DishCardInSection.js";
import { E as Empty } from "../../../chunks/Empty.js";
const OrdenarPedido_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-tn2sw1{margin-top:1em !important}",
  map: null
};
const OrdenarPedido = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $menuCategoryQuery, $$unsubscribe_menuCategoryQuery;
  const menuCategoryQuery = createQuery({
    queryKey: [GetCategoryItems],
    queryFn: async () => await cart.fetchMenuCategories()
  });
  $$unsubscribe_menuCategoryQuery = subscribe(menuCategoryQuery, (value) => $menuCategoryQuery = value);
  $$result.css.add(css);
  $$unsubscribe_menuCategoryQuery();
  return `<div class="space-y-8 bg-gray-100 rounded-lg shadow-md p-6"><h2 class="text-3xl font-bold mb-4 text-center" data-svelte-h="svelte-1h63y2e">Menú</h2> ${$menuCategoryQuery.isLoading ? `${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}` : `${$menuCategoryQuery.isError ? `<p class="text-red">Error: ${escape($menuCategoryQuery.error.message)}</p>` : `${$menuCategoryQuery.isSuccess ? `${$menuCategoryQuery.data.length > 0 ? `${each($menuCategoryQuery.data, (category) => {
    return `${category.items.length > 0 ? `<section class="svelte-tn2sw1"><details class="border rounded-lg overflow-hidden transition-all duration-300 ease-in-out"><summary class="text-2xl font-bold mb-0 cursor-pointer bg-gray-200 p-2 hover:bg-gray-200"><span class="text-gray-600">${escape(category.name)}</span> <span class="view-more" data-svelte-h="svelte-1pchysm">Ver Más</span></summary> <div class="grid gap-6 justify-items-center p-4 bg-gray-100/100">${each(category.items, (item) => {
      return `${validate_component(DishCardInSection, "DishCardInSection").$$render($$result, { item }, {}, {})}`;
    })} </div></details> </section>` : ``}`;
  })}` : `${validate_component(Empty, "Empty").$$render($$result, {}, {}, {})}`}` : ``}`}`} </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $cart, $$unsubscribe_cart;
  $$unsubscribe_cart = subscribe(cart, (value) => $cart = value);
  $$unsubscribe_cart();
  return `${$$result.head += `<!-- HEAD_svelte-13heaz7_START -->${$$result.title = `<title>Pedidos</title>`, ""}<!-- HEAD_svelte-13heaz7_END -->`, ""} <div class="container mx-auto px-4 py-8 mt-10"><h1 class="text-4xl font-bold text-center mb-8" data-svelte-h="svelte-fibyiq">Ordenar aquí</h1> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2">${validate_component(OrdenarPedido, "OrdenarPedido").$$render($$result, {}, {}, {})}</div> <div class="h-fit" id="cart">${validate_component(Cart, "Cart").$$render($$result, {}, {}, {})}</div></div> ${$cart.length > 0 ? `${``}` : ``}</div>`;
});
export {
  Page as default
};
