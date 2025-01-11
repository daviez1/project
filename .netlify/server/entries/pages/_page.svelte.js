import { c as create_ssr_component, b as add_attribute, e as escape, a as subscribe, v as validate_component, d as each } from "../../chunks/ssr.js";
import { c as cart, a as createQuery, G as GetMenuItems, L as Loader } from "../../chunks/Loader.js";
import { C as Cart } from "../../chunks/ButtonSeeOrders.svelte_svelte_type_style_lang.js";
import { E as Empty } from "../../chunks/Empty.js";
import { b as animate__fadeInLeft, c as animate__fadeInRight } from "../../chunks/animate.js";
const Hanoi$1 = "/_app/immutable/assets/Hanoi.433ebbd3.jpg";
const Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section class="relative h-[600px] flex items-center justify-center bg-gray-900 mt-16 text-white"><div class="absolute inset-0 overflow-hidden" data-svelte-h="svelte-15j0bzx"><div class="absolute inset-0 bg-black/60 z-0"></div> <img${add_attribute("src", Hanoi$1, 0)} alt="Restaurant interior" class="w-full h-full object-cover"></div> <div class="relative z-0 text-center px-4" data-svelte-h="svelte-4w5rnb"><h1 class="text-5xl font-bold mb-4">Bienvenido a nuestro Restaurante</h1> <p class="text-2xl font-bold mb-8">Disfruta de la deliciosa comida de esta ciudad</p> <div class="space-x-4"><a href="/ordenar" class="bg-white text-gray-900 border-2 border-gray px-6 py-3 rounded-lg font-semibold hover:bg-gray/10">Ver Menú</a> <a href="/ordenar" class="bg-white text-gray-900 border-2 border-gray px-6 py-3 rounded-lg font-semibold hover:bg-gray-40">Ordenar ahora</a></div></div></section>`;
});
const DishCard_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".div.svelte-1fhpiot{width:20em}",
  map: null
};
const DishCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { item } = $$props;
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  $$result.css.add(css$1);
  return `<div class="div w-100 rounded-lg shadow-md overflow-hidden m-auto mb-5 border flex flex-col bg-white svelte-1fhpiot"><img${add_attribute("src", item.image, 0)}${add_attribute("alt", item.name, 0)} class="w-full p-2 block h-80 object-cover"> <div class="p-4 flex flex-col flex-grow h-40 "><h3 class="text-xl font-semibold mb-2 capitalize">${escape(item.name)}</h3> <p class="text-gray-600 mb-1 flex-grow">${escape(item.description)}</p> <div class="mt-auto flex justify-between items-center"><span class="text-lg font-bold">$${escape(item.price.toFixed(2))}</span> <button ${!item.available ? "disabled" : ""} class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">${escape(item.available ? "Pedir" : "Agotado")}</button></div></div> </div>`;
});
const css = {
  code: "button.svelte-1mc3gbm{opacity:.7}",
  map: null
};
const ButtonSeeOrders = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { direction: direction2 } = $$props;
  if ($$props.direction === void 0 && $$bindings.direction && direction2 !== void 0)
    $$bindings.direction(direction2);
  $$result.css.add(css);
  return `<button class="cursor-pointer inline bg-gray-800 px-3 py-2 rounded-md text-white tracking-wider shadow-xl animate-bounce hover:animate-none svelte-1mc3gbm">Ver Pedidos 
${direction2 === "down" ? `<svg class="w-6 h-6 inline text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19V5m0 14-4-4m4 4 4-4"></path></svg>` : ``} ${direction2 === "up" ? `<svg class="w-6 h-6 inline text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v13m0-13 4 4m-4-4-4 4"></path></svg>` : ``} </button>`;
});
let direction = "down";
const FeaturedDishes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $menuItemsQuery, $$unsubscribe_menuItemsQuery;
  let $cart, $$unsubscribe_cart;
  $$unsubscribe_cart = subscribe(cart, (value) => $cart = value);
  let paginateMenu = [];
  const menuItemsQuery = createQuery({
    queryKey: [GetMenuItems],
    queryFn: async () => await cart.fetchMenuItems()
  });
  $$unsubscribe_menuItemsQuery = subscribe(menuItemsQuery, (value) => $menuItemsQuery = value);
  $$unsubscribe_menuItemsQuery();
  $$unsubscribe_cart();
  return `<section><div class="container mb-8 mx-auto p-4 rounded shadow-lg"><h2 class="text-3xl font-bold text-center mb-12 leading-8 font-extrabold tracking-tight text-gray-700 sm:text-4xl" data-svelte-h="svelte-1nmbqzi">Algunos de nuestros platos</h2> <div>${$menuItemsQuery.isLoading ? `${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}` : `${$menuItemsQuery.isError ? `<p>Error: ${escape($menuItemsQuery.error.message)}</p>` : `${$menuItemsQuery.isSuccess ? `${$menuItemsQuery.data.length > 0 ? `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${each(paginateMenu, (item) => {
    return `${validate_component(DishCard, "DishCard").$$render($$result, { item }, {}, {})}`;
  })}</div>` : `<div class="container mx-auto px-4 py-8">${validate_component(Empty, "Empty").$$render($$result, {}, {}, {})}</div>`}` : ``}`}`}</div></div> ${$cart.length > 0 ? `${`<div class="fixed top-20 right-4 z-50">${validate_component(ButtonSeeOrders, "ButtonSeeOrders").$$render($$result, { direction }, {}, {})}</div>`} <div id="cart">${validate_component(Cart, "Cart").$$render($$result, {}, {}, {})}</div>` : ``}</section>`;
});
const welcome = [
  {
    header: `¡Bienvenido a Ranchón Hanoi! 🌴 `,
    text: `Ubicado en el corazón de La Habana, Ranchón Hanoi te invita a disfrutar de una experiencia gastronómica única que celebra la rica diversidad de la cocina cubana. 
        Nuestro restaurante es un rincón acogedor donde los sabores tradicionales se encuentran con la creatividad culinaria, ofreciendo una variedad de platos que deleitarán tu paladar.`
  },
  {
    text: `Ya sea que estés aquí para una comida familiar, una cena romántica, o una celebración especial, nuestro menú tiene algo para todos. Desde suculentas carnes asadas y mariscos frescos, hasta deliciosos platos vegetarianos y postres caseros, cada bocado en Ranchón Hanoi es una celebración de la auténtica cocina cubana.
        Nuestro equipo de chefs apasionados y personal amable se dedica a brindarte una experiencia inolvidable, donde cada detalle cuenta. Ven y descubre por qué Ranchón Hanoi es el lugar perfecto para disfrutar de la buena comida, la buena compañía y el espíritu vibrante de Cuba.
        ¡Te esperamos con los brazos abiertos y los platos llenos de sabor! 🍽️`
  }
];
const Hanoi = "/_app/immutable/assets/columpio de chill guy.e32466a1.jpg";
const WelcomeText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="py-8"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap lg:flex-nowrap items-center"><div class="${"w-full lg:w-8/12 text-center " + escape(animate__fadeInLeft, true)}"><p class="text-3xl leading-8 font-extrabold tracking-tight text-gray-700 sm:text-4xl">${escape(welcome[0].header)}</p> <p class="mt-4 mr-4 text-xl text-gray-500">${escape(welcome[0].text)}</p></div> <div class="w-full lg:w-4/12 hidden lg:flex justify-center" data-svelte-h="svelte-p6t6c5"><img${add_attribute("src", Hanoi, 0)} alt="Imagen del restaurante" class="${"rounded-lg " + escape(animate__fadeInRight, true) + " shadow-lg object-cover h-full"}"></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1c6tdtw_START -->${$$result.title = `<title>Restaurant Hanoi - Bienvenidos</title>`, ""}<!-- HEAD_svelte-1c6tdtw_END -->`, ""} ${validate_component(Hero, "Hero").$$render($$result, {}, {}, {})} ${validate_component(WelcomeText, "WelcomeText").$$render($$result, {}, {}, {})} ${validate_component(FeaturedDishes, "FeaturedDishes").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
