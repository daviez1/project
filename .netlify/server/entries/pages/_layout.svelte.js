import { c as create_ssr_component, a as subscribe, e as escape, b as add_attribute, o as onDestroy, v as validate_component } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
import { a as animate_bounceInRight } from "../../chunks/animate.js";
import { QueryClient } from "@tanstack/query-core";
import { s as setQueryClientContext } from "../../chunks/context.js";
const app = "";
const animate = "";
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<div class="fixed top-0 w-full z-10"><nav class="bg-white"><div><div class="flex justify-between items-center h-16"><a href="/" class="${"font-bold " + escape(animate_bounceInRight, true) + " inline text-xl ml-8"}" data-svelte-h="svelte-khtx6v">Restaurante Hanoi</a> <div class="md:hidden"><button class="text-gray-700 hover:text-gray-900 focus:outline-none" data-svelte-h="svelte-1h5rw6q"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path></svg></button></div> <div class="hidden md:flex space-x-4 text-right mr-12"><a href="/chillGuy" class="${[
    "text-gray-700 " + escape(animate_bounceInRight, true) + " hover:text-gray-900 px-3 py-2 rounded-md",
    $page.url.pathname === "/" ? "font-bold" : ""
  ].join(" ").trim()}" data-svelte-h="svelte-1cmo704">Ver a Chill Guy😎</a> <a href="/kiosko" class="${[
    "text-gray-700 " + escape(animate_bounceInRight, true) + " hover:text-gray-900 px-3 py-2 rounded-md",
    $page.url.pathname === "/kiosko" ? "font-bold" : ""
  ].join(" ").trim()}" data-svelte-h="svelte-o7bggh">Kiosko</a> <a href="/ordenar" class="${[
    "text-gray-700 " + escape(animate_bounceInRight, true) + " hover:text-gray-900 px-3 py-2 rounded-md",
    $page.url.pathname === "/ordenar" ? "font-bold" : ""
  ].join(" ").trim()}" data-svelte-h="svelte-1mt1ekj">Ver menú/Ordenar Pedido</a> <a href="/gestionarPedidos" class="${[
    "text-gray-700 " + escape(animate_bounceInRight, true) + " hover:text-gray-900 px-3 py-2 rounded-md",
    $page.url.pathname === "/gestionarPedidos" ? "font-bold" : ""
  ].join(" ").trim()}" data-svelte-h="svelte-dob7p1">Gestionar Pedidos</a> <a href="/inventory" class="${[
    "text-gray-700 " + escape(animate_bounceInRight, true) + " hover:text-gray-900 px-3 py-2 rounded-md",
    $page.url.pathname === "/inventory" ? "font-bold" : ""
  ].join(" ").trim()}" data-svelte-h="svelte-10n3xco">Inventario</a></div></div> <div${add_attribute("class", `md:hidden ${"hidden"} text-right`, 0)}><a href="/" class="${[
    "block text-gray-700 " + escape(animate_bounceInRight, true) + " hover:text-gray-900 py-2 rounded-md",
    $page.url.pathname === "/" ? "font-bold" : ""
  ].join(" ").trim()}" data-svelte-h="svelte-1oqcyrg">Home</a> <a href="/chillGuy" class="${[
    "block text-gray-700 " + escape(animate_bounceInRight, true) + " hover:text-gray-900 px-3 py-2 rounded-md",
    $page.url.pathname === "/chillGuy" ? "font-bold" : ""
  ].join(" ").trim()}" data-svelte-h="svelte-kah3hj">Ver a Chill Guy😎</a> <a href="/kiosko" class="${[
    "block text-gray-700 " + escape(animate_bounceInRight, true) + " hover:text-gray-900 px-3 py-2 rounded-md",
    $page.url.pathname === "/kiosko" ? "font-bold" : ""
  ].join(" ").trim()}" data-svelte-h="svelte-s2t4h5">Kiosko</a> <a href="/ordenar" class="${[
    "block text-gray-700 " + escape(animate_bounceInRight, true) + " hover:text-gray-900 px-3 py-2 rounded-md",
    $page.url.pathname === "/ordenar" ? "font-bold" : ""
  ].join(" ").trim()}" data-svelte-h="svelte-14h48qd">Ver menú/Ordenar Pedido</a> <a href="/gestionarPedidos" class="${[
    "block text-gray-700 " + escape(animate_bounceInRight, true) + " hover:text-gray-900 px-3 py-2 rounded-md",
    $page.url.pathname === "/gestionarPedidos" ? "font-bold" : ""
  ].join(" ").trim()}" data-svelte-h="svelte-14km3jt">Gestionar Pedidos</a></div></div></nav></div>`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<footer class="bg-gray-800 text-white py-8" data-svelte-h="svelte-65ao81"><div class="container mx-auto px-4"><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><div><h3 class="text-xl font-bold mb-4">Contacto</h3> <p>Restaurant Hanoi</p> <p>Alamar, Habana del Este, La Habana,Cuba</p> <p>Teléfono: (555) 123-4567</p></div> <div><h3 class="text-xl font-bold mb-4">Horario</h3> <p>Lunes - Domingo: 11am - 10pm</p></div> <div><h3 class="text-xl font-bold mb-4">Follow Us</h3> <div class="flex space-x-4"></div></div></div></div></footer>`;
});
const QueryClientProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { client = new QueryClient() } = $$props;
  setQueryClientContext(client);
  onDestroy(() => {
    client.unmount();
  });
  if ($$props.client === void 0 && $$bindings.client && client !== void 0)
    $$bindings.client(client);
  return `${slots.default ? slots.default({}) : ``}`;
});
const QueryClientProvider$1 = QueryClientProvider;
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: `@import url('https://fonts.googleapis.com/css2?family=Agbalumo&family=Platypi:ital,wght@0,300..800;1,300..800&display=swap');@import url('https://fonts.googleapis.com/css2?family=Agbalumo&display=swap');.platypi.svelte-1jo7dk1{font-family:"Platypi", serif;font-optical-sizing:auto;font-weight:600;font-style:normal}`,
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const queryClient = new QueryClient();
  $$result.css.add(css);
  return `${validate_component(QueryClientProvider$1, "QueryClientProvider").$$render($$result, { client: queryClient }, {}, {
    default: () => {
      return `<div class="min-h-screen flex flex-col platypi svelte-1jo7dk1">${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})} <main class="flex-grow">${slots.default ? slots.default({}) : ``}</main> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
    }
  })}`;
});
export {
  Layout as default
};
