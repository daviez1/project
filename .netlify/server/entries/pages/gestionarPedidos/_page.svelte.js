import { c as create_ssr_component, a as subscribe, e as escape, n as null_to_empty, d as each, v as validate_component } from "../../../chunks/ssr.js";
import { a as createQuery, G as GetMenuItems, c as cart, b as GetKioskoItems, d as GetOrders, o as orders, g as getMenuItem, e as getKioskoItem, L as Loader } from "../../../chunks/Loader.js";
import { a as statusPlus } from "../../../chunks/statusPlus.js";
/* empty css                                                           */import "mongoose";
const translateStatus = (status) => {
  if (status == "pending")
    return status = "Pendiente";
  if (status == "preparing")
    return status = "Preparar";
  if (status == "ready")
    return status = "Listo";
  if (status == "completed")
    return status = "Entregar";
};
const OrderCard_svelte_svelte_type_style_lang = "";
const css = {
  code: ".ml-10.svelte-8oo2p0{margin:0 20px}.btn-change-status.svelte-8oo2p0{border-radius:3px}",
  map: null
};
const OrderCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $kioskoItemsQuery, $$unsubscribe_kioskoItemsQuery;
  let $menuItemsQuery, $$unsubscribe_menuItemsQuery;
  let { order } = $$props;
  const menuItemsQuery = createQuery({
    queryKey: [GetMenuItems],
    queryFn: async () => await cart.fetchMenuItems()
  });
  $$unsubscribe_menuItemsQuery = subscribe(menuItemsQuery, (value) => $menuItemsQuery = value);
  const kioskoItemsQuery = createQuery({
    queryKey: [GetKioskoItems],
    queryFn: async () => await cart.fetchKioskoItems()
  });
  $$unsubscribe_kioskoItemsQuery = subscribe(kioskoItemsQuery, (value) => $kioskoItemsQuery = value);
  createQuery({
    queryKey: [GetOrders],
    queryFn: async () => await orders.fetchOrders()
  });
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    preparing: "bg-blue-100 text-blue-800",
    ready: "bg-green-100 text-green-800",
    completed: "bg-gray-100 text-gray-800"
  };
  const statusColorsPlus = {
    pending: "bg-blue-100 text-blue-800",
    preparing: "bg-green-100 text-green-800",
    ready: "bg-gray-100 text-gray-800",
    completed: "bg-yellow-100 text-gray-800"
  };
  if ($$props.order === void 0 && $$bindings.order && order !== void 0)
    $$bindings.order(order);
  $$result.css.add(css);
  $menuItemsQuery.data || [];
  $kioskoItemsQuery.data || [];
  $$unsubscribe_kioskoItemsQuery();
  $$unsubscribe_menuItemsQuery();
  return `<div class="bg-white rounded-lg shadow-md p-6"><div class="flex justify-between items-start mb-4"><div><h3 class="text-lg font-semibold">Pedido #${escape(order.id)}</h3> <p class="text-sm text-gray-600">${escape(new Date(order.createdAt).toLocaleString())}</p></div> <span class="${escape(null_to_empty(`px-3 py-1 rounded-full capitalize text-sm font-medium ${statusColors[order.status]}`), true) + " svelte-8oo2p0"}">${escape(`${order.status === "completed" ? "Completado" : translateStatus(order.status)}!`)}</span> <button class="${escape(null_to_empty(`btn-change-status px-3 py-1 rounded-full capitalize text-sm font-medium ${statusColorsPlus[order.status]} ${order.status === "completed" && "hidden"}`), true) + " svelte-8oo2p0"}" ${order.status == "completed" ? "disabled" : ""}>${escape(translateStatus(statusPlus(order.status)))}</button></div> <div class="space-y-2 mb-4">${$menuItemsQuery.isSuccess && $kioskoItemsQuery.isSuccess ? `${each(order.items, (item) => {
    let menuItem = getMenuItem(item.menuItemId, $menuItemsQuery.data) ?? getKioskoItem(item.menuItemId, $kioskoItemsQuery.data);
    return ` <div class="flex justify-between"><span>${escape(item.name)} x ${escape(item.quantity)}</span> <span>$${escape(((menuItem?.price || 0) * item.quantity)?.toFixed(2))}</span> </div>`;
  })}` : `<p data-svelte-h="svelte-scuope">Cargando elementos del menú...</p>`}</div> ${``} <div class="border-t pt-4 flex justify-between items-center"><span class="font-semibold" data-svelte-h="svelte-aq93sg">Total:</span> <span class="font-semibold">$${escape(order.total.toFixed(2) ?? 0)}</span></div> </div>`;
});
const OrderList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $ordersQuery, $$unsubscribe_ordersQuery;
  let $orders, $$unsubscribe_orders;
  $$unsubscribe_orders = subscribe(orders, (value) => $orders = value);
  const ordersQuery = createQuery({
    queryKey: [GetOrders],
    queryFn: async () => await orders.fetchOrders()
  });
  $$unsubscribe_ordersQuery = subscribe(ordersQuery, (value) => $ordersQuery = value);
  $$unsubscribe_ordersQuery();
  $$unsubscribe_orders();
  return `<div class="space-y-6">${$ordersQuery.isLoading ? `${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}` : `${$ordersQuery.isError ? `<p>Error: ${escape($ordersQuery.error.message)}</p>` : `${$ordersQuery.isSuccess ? `${each($orders, (order) => {
    return `${validate_component(OrderCard, "OrderCard").$$render($$result, { order }, {}, {})}`;
  })}` : ``}`}`}</div>`;
});
const OrderStatus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pendingOrders;
  let ordersDB = [];
  pendingOrders = ordersDB.filter((order) => order.status === "pending" || order.status === "preparing" || order.status === "ready" || order.status === "completed");
  return `<div class="bg-white mt-5 rounded-lg shadow-md p-6 mb-8"><h2 class="text-2xl font-bold mb-6" data-svelte-h="svelte-29kn90">Estados de pedidos</h2> ${pendingOrders.length === 0 ? `<p class="text-center text-gray-500" data-svelte-h="svelte-kzpd2g">Sin pedidos activos</p>` : `<div class="space-y-4">${each(pendingOrders, (order) => {
    return `<div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg"><div><span class="font-semibold">Pedido #${escape(order.id)}</span> <p class="text-sm text-gray-600">Estado: <span class="font-medium capitalize">${escape(translateStatus(order.status))}</span> </p></div> ${order.status === "ready" ? `<span class="text-green-600 font-medium animate-pulse" data-svelte-h="svelte-13u9ep7">Listo para entrega!
            </span>` : ``} ${order.status === "completed" ? `<span class="text-green-600 font-medium animate-pulse" data-svelte-h="svelte-mf4koj">Entregado!
            </span>` : ``} </div>`;
  })}</div>`}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-12y32j1_START -->${$$result.title = `<title>Gestión de Pedidos</title>`, ""}<!-- HEAD_svelte-12y32j1_END -->`, ""} <div class="container mx-auto px-4 py-8 mt-10"><h1 class="text-4xl font-bold text-center mb-8" data-svelte-h="svelte-1a056gz">Gestión de Pedidos</h1> ${validate_component(OrderList, "OrderList").$$render($$result, {}, {}, {})} ${validate_component(OrderStatus, "OrderStatus").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Page as default
};
