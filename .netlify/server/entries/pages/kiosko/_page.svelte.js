import { c as create_ssr_component, e as escape, d as each, v as validate_component, a as subscribe } from "../../../chunks/ssr.js";
import { D as DishCardInSection } from "../../../chunks/DishCardInSection.js";
import { C as Cart } from "../../../chunks/ButtonSeeOrders.svelte_svelte_type_style_lang.js";
import { a as createQuery, c as cart, L as Loader, f as GetKioskoCategoryItems } from "../../../chunks/Loader.js";
import { E as Empty } from "../../../chunks/Empty.js";
const KioskoCategory_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-zi0fgu{margin-top:1em !important\r\n  }",
  map: null
};
const KioskoCategory = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { category } = $$props;
  if ($$props.category === void 0 && $$bindings.category && category !== void 0)
    $$bindings.category(category);
  $$result.css.add(css);
  return `<section class="svelte-zi0fgu"><details class="border rounded-lg overflow-hidden transition-all duration-300 ease-in-out"><summary class="text-2xl font-bold mb-0 cursor-pointer bg-gray-100 p-2 hover:bg-gray-200"><span class="text-gray-600">${escape(category.name)}</span> <span class="view-more" data-svelte-h="svelte-1pchysm">Ver Más</span></summary> <div class="${"grid grid-cols-1 " + escape(
    category.items.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1",
    true
  ) + " gap-6 justify-items-center p-4 bg-white"}">${each(category.items, (item) => {
    return `${validate_component(DishCardInSection, "DishCardInSection").$$render($$result, { item }, {}, {})}`;
  })}</div></details> </section>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $kioskoCategoryQuery, $$unsubscribe_kioskoCategoryQuery;
  let $cart, $$unsubscribe_cart;
  $$unsubscribe_cart = subscribe(cart, (value) => $cart = value);
  const kioskoCategoryQuery = createQuery({
    queryKey: [GetKioskoCategoryItems],
    queryFn: async () => await cart.fetchKioskoCategories()
  });
  $$unsubscribe_kioskoCategoryQuery = subscribe(kioskoCategoryQuery, (value) => $kioskoCategoryQuery = value);
  let { direction = "down" } = $$props;
  if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0)
    $$bindings.direction(direction);
  $$unsubscribe_kioskoCategoryQuery();
  $$unsubscribe_cart();
  return `${$$result.head += `<!-- HEAD_svelte-1w32duw_START -->${$$result.title = `<title>Kiosko - Galletas &amp; Más</title>`, ""}<!-- HEAD_svelte-1w32duw_END -->`, ""} <div class="container mx-auto px-4 py-8 mt-10"><h1 class="text-4xl font-bold text-center mb-8" data-svelte-h="svelte-1cmhpmj">Kiosko</h1> <p class="text-center text-gray-600 mb-12" data-svelte-h="svelte-l0nbww">Encuentra comida rápida y picadera</p> <div class="space-y-12">${$kioskoCategoryQuery.isLoading ? `${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}` : `${$kioskoCategoryQuery.isError ? `<p>Error: ${escape($kioskoCategoryQuery.error.message)}</p>` : `${$kioskoCategoryQuery.isSuccess ? `${$kioskoCategoryQuery.data.length > 0 ? `${each($kioskoCategoryQuery.data, (category) => {
    return `${validate_component(KioskoCategory, "KioskoCategory").$$render($$result, { category }, {}, {})}`;
  })} ${$cart.length > 0 ? `<div id="cart">${validate_component(Cart, "Cart").$$render($$result, {}, {}, {})}</div> ${``}` : ``}` : `${validate_component(Empty, "Empty").$$render($$result, {}, {}, {})}`}` : ``}`}`}</div></div>`;
});
export {
  Page as default
};
