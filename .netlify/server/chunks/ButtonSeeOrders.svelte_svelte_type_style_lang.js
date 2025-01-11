import { c as create_ssr_component, a as subscribe, d as each, e as escape } from "./ssr.js";
import { c as cart, a as createQuery, G as GetMenuItems, i as GetOrdersLastId, o as orders, b as GetKioskoItems, g as getMenuItem, e as getKioskoItem } from "./Loader.js";
import "mongoose";
/* empty css                                             */const Cart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let menuItems;
  let kioskoItems;
  let items;
  let total;
  let $cart, $$unsubscribe_cart;
  let $kioskoItemsQuery, $$unsubscribe_kioskoItemsQuery;
  let $menuItemsQuery, $$unsubscribe_menuItemsQuery;
  let $ordersLastIdQuery, $$unsubscribe_ordersLastIdQuery;
  $$unsubscribe_cart = subscribe(cart, (value) => $cart = value);
  const menuItemsQuery = createQuery({
    queryKey: [GetMenuItems],
    queryFn: async () => await cart.fetchMenuItems()
  });
  $$unsubscribe_menuItemsQuery = subscribe(menuItemsQuery, (value) => $menuItemsQuery = value);
  const ordersLastIdQuery = createQuery({
    queryKey: [GetOrdersLastId],
    queryFn: async () => {
      const ordersData = await orders.fetchOrders();
      return ordersData[ordersData.length - 1].id;
    }
  });
  $$unsubscribe_ordersLastIdQuery = subscribe(ordersLastIdQuery, (value) => $ordersLastIdQuery = value);
  const kioskoItemsQuery = createQuery({
    queryKey: [GetKioskoItems],
    queryFn: async () => await cart.fetchKioskoItems()
  });
  $$unsubscribe_kioskoItemsQuery = subscribe(kioskoItemsQuery, (value) => $kioskoItemsQuery = value);
  $ordersLastIdQuery.data || "";
  menuItems = $menuItemsQuery.data || [];
  kioskoItems = $kioskoItemsQuery.data || [];
  items = $cart.map((item) => ({
    ...item,
    menuItem: getMenuItem(item.menuItemId, menuItems) ?? getKioskoItem(item.menuItemId, kioskoItems)
  }));
  total = items.reduce((sum, item) => sum + (item.menuItem?.price || 0) * item.quantity, 0);
  $$unsubscribe_cart();
  $$unsubscribe_kioskoItemsQuery();
  $$unsubscribe_menuItemsQuery();
  $$unsubscribe_ordersLastIdQuery();
  return `<div class="bg-white div mt-5 rounded-lg shadow-md p-6"><h2 class="text-2xl font-bold text-gray-700 mb-6" data-svelte-h="svelte-hm3lja">Sus pedidos</h2> ${items.length === 0 ? `<p class="text-gray-500 text-center py-4" data-svelte-h="svelte-3oyd1l">No ha realizado ningún pedido</p>` : `<div class="space-y-4 mb-6">${each(items, (item) => {
    return `<div class="flex justify-between items-center"><div><h3 class="font-semibold">${escape(item.menuItem?.name)}</h3> <p class="text-sm text-gray-600">Cantidad: ${escape(item.quantity)}</p></div> <div class="text-right"><p class="font-semibold">$${escape(((item.menuItem?.price || 0) * item.quantity).toFixed(2))}</p> <button class="text-sm text-red-600 hover:text-red-700" data-svelte-h="svelte-1j45jsv">Cancelar
            </button></div> </div>`;
  })}</div> <div class="border-t pt-4"><div class="flex justify-between items-center mb-6"><span class="text-lg font-bold" data-svelte-h="svelte-1w74hq9">Total:</span> <span class="text-lg font-bold">$${escape(total.toFixed(2))}</span></div> <button class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700" data-svelte-h="svelte-18xrnck">Confirmar</button></div>`} ${``}</div>`;
});
const ButtonSeeOrders_svelte_svelte_type_style_lang = "";
export {
  Cart as C
};
