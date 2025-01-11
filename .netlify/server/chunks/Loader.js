import { notifyManager, QueryObserver } from "@tanstack/query-core";
import { r as readable, d as derived, w as writable } from "./index2.js";
import { g as getIsRestoringContext, a as getQueryClientContext } from "./context.js";
import { g as get_store_value, c as create_ssr_component } from "./ssr.js";
import "mongoose";
function useIsRestoring() {
  return getIsRestoringContext();
}
function useQueryClient(queryClient) {
  if (queryClient)
    return queryClient;
  return getQueryClientContext();
}
function isSvelteStore(obj) {
  return "subscribe" in obj && typeof obj.subscribe === "function";
}
function noop() {
}
function createBaseQuery(options, Observer, queryClient) {
  const client = useQueryClient(queryClient);
  const isRestoring = useIsRestoring();
  const optionsStore = isSvelteStore(options) ? options : readable(options);
  const defaultedOptionsStore = derived([optionsStore, isRestoring], ([$optionsStore, $isRestoring]) => {
    const defaultedOptions = client.defaultQueryOptions($optionsStore);
    defaultedOptions._optimisticResults = $isRestoring ? "isRestoring" : "optimistic";
    return defaultedOptions;
  });
  const observer = new Observer(client, get_store_value(defaultedOptionsStore));
  defaultedOptionsStore.subscribe(($defaultedOptions) => {
    observer.setOptions($defaultedOptions, { listeners: false });
  });
  const result = derived(isRestoring, ($isRestoring, set) => {
    const unsubscribe = $isRestoring ? noop : observer.subscribe(notifyManager.batchCalls(set));
    observer.updateResult();
    return unsubscribe;
  });
  const { subscribe } = derived([result, defaultedOptionsStore], ([$result, $defaultedOptionsStore]) => {
    $result = observer.getOptimisticResult($defaultedOptionsStore);
    return !$defaultedOptionsStore.notifyOnChangeProps ? observer.trackResult($result) : $result;
  });
  return { subscribe };
}
function createQuery(options, queryClient) {
  return createBaseQuery(options, QueryObserver, queryClient);
}
const get$4 = async (customFetch = fetch) => {
  const response = await customFetch("/api/menu");
  const menuItems = await response.json();
  return menuItems.menuItems;
};
const search = async (id) => {
  const response = await fetch(`/api/menu/${id}`);
  const menuItem = await response.json();
  return menuItem;
};
const get$3 = async (customFetch = fetch) => {
  const response = await customFetch("/api/menu/category");
  const menuCategory = await response.json();
  return menuCategory.menuCategories;
};
const get$2 = async (customFetch = fetch) => {
  const response = await customFetch("/api/kiosko/category");
  const kioskoCategory = await response.json();
  return kioskoCategory.kioskoCategories;
};
const get$1 = async (customFetch = fetch) => {
  const response = await customFetch("/api/kiosko");
  const kioskoItems = await response.json();
  return kioskoItems.kioskoProducts;
};
function createCartStore() {
  const { subscribe, set, update } = writable([]);
  return {
    subscribe,
    fetchMenuItems: async () => await get$4(),
    fetchMenuItemsById: async (id) => await search(id),
    fetchMenuCategories: async () => await get$3(),
    fetchKioskoCategories: async () => await get$2(),
    fetchKioskoItems: async () => await get$1(),
    addItem: (item) => update((items) => {
      const existingItemIndex = items.findIndex((i) => i.menuItemId === item.menuItemId);
      if (existingItemIndex !== -1) {
        const existingItem = items[existingItemIndex];
        const updatedItem = { ...existingItem, quantity: existingItem.quantity + item.quantity };
        return [
          ...items.slice(0, existingItemIndex),
          updatedItem,
          ...items.slice(existingItemIndex + 1)
        ];
      } else {
        return [...items, item];
      }
    }),
    removeItem: (menuItemId) => update((items) => items.filter((item) => item.menuItemId !== menuItemId)),
    updateQuantity: (menuItemId, quantity) => update(
      (items) => items.map(
        (item) => item.menuItemId === menuItemId ? { ...item, quantity } : item
      )
    ),
    clear: () => set([])
  };
}
const cart = createCartStore();
const get = async (customFetch = fetch) => {
  const response = await customFetch("/api/order");
  const order = await response.json();
  return order.Pedidos;
};
function createOrdersStore() {
  const { subscribe, set, update } = writable([]);
  const post = async (order) => {
    const response = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    });
    if (!response.ok) {
      throw new Error("Error al crear el pedido");
    }
    const newOrder = await response.json();
    update((orders2) => [...orders2, newOrder]);
  };
  const updateStatus = async (id) => {
    const response = await fetch(`/api/order/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el estado del pedido");
    }
    const updatedOrder = await response.json();
    update((orders2) => orders2.map((order) => order.id === updatedOrder.id ? updatedOrder : order));
  };
  const fetchOrders = async () => {
    const orders2 = await get();
    set(orders2);
    return orders2;
  };
  return {
    subscribe,
    post,
    updateStatus,
    fetchOrders
  };
}
const orders = createOrdersStore();
const GetMenuItems = "menuitems";
const GetCategoryItems = "categoryitems";
const GetKioskoCategoryItems = "kioskocategoryitems";
const GetKioskoItems = "kioskoitems";
const GetOrders = "orders";
const GetOrdersLastId = "orderslastid";
const getMenuItem = (id, menuItems) => menuItems.find((item) => item.id === id);
const getKioskoItem = (id, kioskoItems) => kioskoItems.find((item) => item.id === id);
const Loader_svelte_svelte_type_style_lang = "";
const css = {
  code: '.loader.svelte-183dyet.svelte-183dyet{width:fit-content;height:fit-content;display:flex;align-items:center;justify-content:center}.truckWrapper.svelte-183dyet.svelte-183dyet{width:200px;height:100px;display:flex;flex-direction:column;position:relative;align-items:center;justify-content:flex-end;overflow-x:hidden}.truckBody.svelte-183dyet.svelte-183dyet{width:130px;height:fit-content;margin-bottom:6px;animation:svelte-183dyet-motion 1s linear infinite}@keyframes svelte-183dyet-motion{0%{transform:translateY(0px)}50%{transform:translateY(3px)}100%{transform:translateY(0px)}}.truckTires.svelte-183dyet.svelte-183dyet{width:130px;height:fit-content;display:flex;align-items:center;justify-content:space-between;padding:0px 10px 0px 15px;position:absolute;bottom:0}.truckTires.svelte-183dyet svg.svelte-183dyet{width:24px}.road.svelte-183dyet.svelte-183dyet{width:100%;height:1.5px;background-color:#282828;position:relative;bottom:0;align-self:flex-end;border-radius:3px}.road.svelte-183dyet.svelte-183dyet::before{content:"";position:absolute;width:20px;height:100%;background-color:#282828;right:-50%;border-radius:3px;animation:svelte-183dyet-roadAnimation 1.4s linear infinite;border-left:10px solid white}.road.svelte-183dyet.svelte-183dyet::after{content:"";position:absolute;width:10px;height:100%;background-color:#282828;right:-65%;border-radius:3px;animation:svelte-183dyet-roadAnimation 1.4s linear infinite;border-left:4px solid white}.lampPost.svelte-183dyet.svelte-183dyet{position:absolute;bottom:0;right:-90%;height:90px;animation:svelte-183dyet-roadAnimation 1.4s linear infinite}@keyframes svelte-183dyet-roadAnimation{0%{transform:translateX(0px)}100%{transform:translateX(-350px)}}',
  map: null
};
const Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="loader mx-auto svelte-183dyet" data-svelte-h="svelte-1exkkhd"><div class="truckWrapper svelte-183dyet"><div class="truckBody svelte-183dyet"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 198 93" class="trucksvg"><path stroke-width="3" stroke="#282828" fill="#F83D3D" d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"></path><path stroke-width="3" stroke="#282828" fill="#7D7C7C" d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"></path><path stroke-width="2" stroke="#282828" fill="#282828" d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"></path><rect stroke-width="2" stroke="#282828" fill="#FFFCAB" rx="1" height="7" width="5" y="63" x="187"></rect><rect stroke-width="2" stroke="#282828" fill="#282828" rx="1" height="11" width="4" y="81" x="193"></rect><rect stroke-width="3" stroke="#282828" fill="#DFDFDF" rx="2.5" height="90" width="121" y="1.5" x="6.5"></rect><rect stroke-width="2" stroke="#282828" fill="#DFDFDF" rx="2" height="4" width="6" y="84" x="1"></rect></svg></div> <div class="truckTires svelte-183dyet"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" class="tiresvg svelte-183dyet"><circle stroke-width="3" stroke="#282828" fill="#282828" r="13.5" cy="15" cx="15"></circle><circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle></svg> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" class="tiresvg svelte-183dyet"><circle stroke-width="3" stroke="#282828" fill="#282828" r="13.5" cy="15" cx="15"></circle><circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle></svg></div> <div class="road svelte-183dyet"></div> <svg xml:space="preserve" viewBox="0 0 453.459 453.459" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="Capa_1" version="1.1" fill="#000000" class="lampPost svelte-183dyet"><path d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z
M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017
h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"></path></svg></div></div>  `;
});
export {
  GetMenuItems as G,
  Loader as L,
  createQuery as a,
  GetKioskoItems as b,
  cart as c,
  GetOrders as d,
  getKioskoItem as e,
  GetKioskoCategoryItems as f,
  getMenuItem as g,
  GetCategoryItems as h,
  GetOrdersLastId as i,
  orders as o
};
