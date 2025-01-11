import { c as create_ssr_component, e as escape, b as add_attribute, f as createEventDispatcher, a as subscribe, d as each, v as validate_component } from "../../../chunks/ssr.js";
import { d as derived, w as writable } from "../../../chunks/index2.js";
import "mongoose";
/* empty css                                                           */import { E as Empty } from "../../../chunks/Empty.js";
const get = async (customFetch = fetch) => {
  const response = await customFetch("/api/inventory/items");
  const inventoryItems = await response.json();
  return inventoryItems.inventoryItems;
};
function createInventoryStore() {
  const { subscribe: subscribe2, set, update } = writable([]);
  const fetchInventoryItems = async () => {
    try {
      const items = await get();
      if (items) {
        set(items);
      } else {
        console.error("No data returned from API");
      }
      return items;
    } catch (error) {
      console.error("Error fetching inventory items:", error);
    }
  };
  const addInventoryItem = async (newInventoryItem) => {
    const response = await fetch("/api/inventory/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newInventoryItem)
    });
    if (!response.ok) {
      throw new Error("Error al crear el producto en el inventario");
    }
    const newItem = await response.json();
    update((inventory2) => {
      return [...inventory2, newItem.newInventoryItem];
    });
    return newItem;
  };
  const updateStock = async (stockUpdate, id) => {
    const response = await fetch(`/api/inventory/items/stocks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stockUpdate)
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el stock");
    }
    const updatedItem = await response.json();
    update(
      (items) => items.map(
        (item) => item.id === updatedItem.id ? updatedItem : item
      )
    );
  };
  return {
    subscribe: subscribe2,
    fetchInventoryItems,
    addInventoryItem,
    updateStock,
    updateAvailability: (id, available) => update(
      (items) => items.map(
        (item) => item.id === id ? { ...item, available } : item
      )
    ),
    updateItem: (updatedItem) => update(
      (items) => items.map(
        (item) => item.id === updatedItem.id ? updatedItem : item
      )
    )
  };
}
const inventory = createInventoryStore();
const filteredInventory = derived(
  inventory,
  ($inventory) => (filter) => $inventory.filter((item) => {
    if (filter.type && item.type !== filter.type)
      return false;
    if (filter.category && item.category !== filter.category)
      return false;
    if (filter.available !== void 0 && item.available !== filter.available)
      return false;
    if (filter.lowStock && item.quantity > item.minStock)
      return false;
    return true;
  })
);
const InventoryItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { item } = $$props;
  item._id;
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  return `<div class="bg-gray-100 rounded-lg shadow-md p-6 flex"><div class="w-1/2 p-4"><h3 class="font-semibold text-2xl text-center capitalize">${escape(item.name)}</h3> <p class="text-sm text-gray-600 text-center">${escape(item.type)} - ${escape(item.category)}</p> <div class="mt-4 space-y-2"><div class="flex justify-center"><span class="font-semibold text-xl" data-svelte-h="svelte-oe6xyu">Cantidad:</span> <span class="${[
    "font-semibold text-xl ml-2",
    item.quantity <= item.minStock ? "text-red-600" : ""
  ].join(" ").trim()}">${escape(item.quantity)}</span></div> <div class="flex justify-center"><span class="font-semibold text-xl" data-svelte-h="svelte-137lwii">Estado:</span> <span class="${escape(item.available ? "text-green-600" : "text-red-600", true) + " ml-2 text-xl"}">${escape(item.available ? "Disponible" : "No disponible")}</span></div></div> <div class="mt-4 text-center"><button class="text-blue-600 text-md">${escape("Actualizar suministros")}</button> ${``}</div></div> <div class="w-1/2 hidden sm:flex justify-center items-center"><img${add_attribute("src", item.image, 0)}${add_attribute("alt", item.name, 0)} class="w-full h-52 object-cover rounded-lg"></div></div>`;
});
const SeeMore_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".btn.svelte-1w07v9k.svelte-1w07v9k{width:140px;height:40px;display:flex;align-items:center;justify-content:space-evenly;text-transform:uppercase;letter-spacing:1px;border:none;position:relative;background-color:transparent;transition:.2s cubic-bezier(0.19, 1, 0.22, 1);opacity:0.6}.btn.svelte-1w07v9k.svelte-1w07v9k::after{content:'';border-bottom:3px double rgb(214, 207, 113);width:0;height:100%;position:absolute;margin-top:-5px;top:0;left:5px;visibility:hidden;opacity:1;transition:.2s linear}.btn.svelte-1w07v9k .icon.svelte-1w07v9k{transform:translateX(0%);transition:.2s linear;animation:svelte-1w07v9k-attention 1.2s linear infinite}.btn.svelte-1w07v9k.svelte-1w07v9k:hover::after{visibility:visible;opacity:0.7;width:90%}.btn.svelte-1w07v9k.svelte-1w07v9k:hover{letter-spacing:2px;opacity:1}.btn.svelte-1w07v9k:hover>.icon.svelte-1w07v9k{transform:translateX(30%);animation:none}@keyframes svelte-1w07v9k-attention{0%{transform:translateX(0%)}50%{transform:translateX(30%)}}",
  map: null
};
const SeeMore = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `<button class="btn mr-2 svelte-1w07v9k" data-svelte-h="svelte-2jhzkd">Ver detalles 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15px" width="15px" class="icon svelte-1w07v9k"><path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5" stroke="#292D32" d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008"></path></svg> </button>`;
});
const FormAddInventoryItem_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "input.svelte-1c6dx4q,select.svelte-1c6dx4q,textarea.svelte-1c6dx4q{padding:.3em}",
  map: null
};
const FormAddInventoryItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let newProduct = {
    id: "",
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    type: "menu",
    category: "",
    image: "",
    available: true,
    minStock: 0,
    maxStock: 0,
    lastRestocked: /* @__PURE__ */ new Date()
  };
  $$result.css.add(css$2);
  return `<div class="inline mx-8 h-fit shadow-md p-4 mb-20 bg-gray-100"><h1 class="text-3xl font-bold text-center mb-8 text-gray-600" data-svelte-h="svelte-cgrczp">Gestión de productos</h1> <form class="space-y-4"><div><label for="name" class="block text-sm font-medium text-gray-700" data-svelte-h="svelte-1ce3jg7">Nombre del producto</label> <input type="text" id="name" class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 svelte-1c6dx4q" placeholder="Nombre del producto" required${add_attribute("value", newProduct.name, 0)}></div> <div><label for="description" class="block text-sm font-medium text-gray-700" data-svelte-h="svelte-l130of">Descripción</label> <textarea id="description" class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 svelte-1c6dx4q" placeholder="Descripción del producto" required>${escape("")}</textarea></div> <div><label for="price" class="block text-sm font-medium text-gray-700" data-svelte-h="svelte-uvjgfx">Precio</label> <input type="number" id="price" class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 svelte-1c6dx4q" placeholder="Precio" required${add_attribute("value", newProduct.price, 0)}></div> <div><label for="quantity" class="block text-sm font-medium text-gray-700" data-svelte-h="svelte-1svyvwj">Cantidad</label> <input type="number" id="quantity" class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 svelte-1c6dx4q" placeholder="Cantidad" required${add_attribute("value", newProduct.quantity, 0)}></div> <div><label for="type" class="block text-sm font-medium text-gray-700" data-svelte-h="svelte-17z1ca6">Tipo</label> <select id="type" class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 svelte-1c6dx4q"><option value="menu" data-svelte-h="svelte-9ao4ln">Restaurante</option><option value="kiosk" data-svelte-h="svelte-1ln54ij">Kiosko</option></select></div> <div><label for="category" class="block text-sm font-medium text-gray-700" data-svelte-h="svelte-11rwnrt">Categoría</label> <input type="text" id="category" class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 svelte-1c6dx4q" placeholder="Categoría" required${add_attribute("value", newProduct.category, 0)}></div> <div><label for="image" class="block text-sm font-medium text-gray-700" data-svelte-h="svelte-1eov3k8">Imagen (URL)</label> <input type="text" id="image" class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 svelte-1c6dx4q" placeholder="URL de la imagen" required${add_attribute("value", newProduct.image, 0)}></div> <div><label for="minStock" class="block text-sm font-medium text-gray-700" data-svelte-h="svelte-1rtvheb">Stock mínimo</label> <input type="number" id="minStock" class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 svelte-1c6dx4q" placeholder="Stock mínimo" required${add_attribute("value", newProduct.minStock, 0)}></div> <div><label for="maxStock" class="block text-sm font-medium text-gray-700" data-svelte-h="svelte-zq57u7">Stock máximo</label> <input type="number" id="maxStock" class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 svelte-1c6dx4q" placeholder="Stock máximo" required${add_attribute("value", newProduct.maxStock, 0)}> ${``}</div> <div><label for="available" class="block text-sm font-medium text-gray-700" data-svelte-h="svelte-1fm8zpy">Disponible</label> <input type="checkbox" id="available" class="mt-1 block rounded-md border-gray-300 shadow-sm svelte-1c6dx4q"${add_attribute("checked", newProduct.available, 1)}></div> <button type="submit" class="w-full bg-gray-700 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700" data-svelte-h="svelte-1k1acaf">Agregar producto</button></form> ${``} </div>`;
});
let searchQuery = "";
const InventoryList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let items;
  let $filteredInventory, $$unsubscribe_filteredInventory;
  $$unsubscribe_filteredInventory = subscribe(filteredInventory, (value) => $filteredInventory = value);
  let { groupedItems } = $$props;
  let filter = { type: void 0 };
  if ($$props.groupedItems === void 0 && $$bindings.groupedItems && groupedItems !== void 0)
    $$bindings.groupedItems(groupedItems);
  items = $filteredInventory(filter).filter((item) => (item.name?.toLowerCase() || "").includes(searchQuery) || (item.category?.toLowerCase() || "").includes(searchQuery));
  items.filter((item) => item.quantity <= item.minStock);
  $$unsubscribe_filteredInventory();
  return ` <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-8 rounded"><ul class="inline h-fit p-4 rounded">${Object.keys(groupedItems).length > 0 ? `${each(Object.keys(groupedItems), (category) => {
    return `<li class="bg-gray-100 rounded-lg p-1 mb-2 shadow-md"><div class="flex justify-between items-center"><div><h3 class="font-bold text-2xl capitalize text-gray-600 ml-2">${escape(category)}</h3></div> ${validate_component(SeeMore, "SeeMore").$$render($$result, {}, {}, {})}</div> <div class="details hidden mt-4"><ul class="space-y-2">${each(groupedItems[category], (item) => {
      return `<li>${validate_component(InventoryItem, "InventoryItemComponent").$$render($$result, { item }, {}, {})} </li>`;
    })} </ul></div> </li>`;
  })}` : `${validate_component(Empty, "Empty").$$render($$result, {}, {}, {})}`}</ul> ${validate_component(FormAddInventoryItem, "FormAddInventoryItem").$$render($$result, {}, {}, {})}</div>`;
});
const Searcher_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".search-bar.svelte-1sm0l9h{margin-bottom:1rem}",
  map: null
};
const Searcher = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let searchQuery2 = "";
  createEventDispatcher();
  $$result.css.add(css$1);
  return `<spani class="search-bar mt-4 w-full md:w-auto svelte-1sm0l9h"><input type="text" placeholder="Buscar productos..." class="p-2 shadow-md border rounded-lg"${add_attribute("value", searchQuery2, 0)}> </spani>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '.select.svelte-px9gwf.svelte-px9gwf.svelte-px9gwf{transition:300ms;overflow:hidden}.selected.svelte-px9gwf.svelte-px9gwf.svelte-px9gwf{background-color:#2a2f3b;padding:5px;margin-bottom:3px;border-radius:5px;position:relative;font-size:15px;display:flex;align-items:center;justify-content:space-between}.arrow.svelte-px9gwf.svelte-px9gwf.svelte-px9gwf{position:relative;right:0px;height:10px;transform:rotate(-90deg);width:25px;fill:white;z-index:100000;transition:300ms}.options.svelte-px9gwf.svelte-px9gwf.svelte-px9gwf{display:flex;flex-direction:column;border-radius:5px;padding:5px;background-color:#2a2f3b;position:relative;opacity:0;transition:300ms}.select.svelte-px9gwf:hover>.options.svelte-px9gwf.svelte-px9gwf{opacity:1;top:0}.select.svelte-px9gwf:hover>.selected .arrow.svelte-px9gwf.svelte-px9gwf{transform:rotate(0deg)}.option.svelte-px9gwf.svelte-px9gwf.svelte-px9gwf{border-radius:5px;padding:5px;transition:300ms;background-color:#2a2f3b;width:150px;font-size:15px}.option.svelte-px9gwf.svelte-px9gwf.svelte-px9gwf:hover{background-color:#323741}.options.svelte-px9gwf input[type="radio"].svelte-px9gwf.svelte-px9gwf{display:none}.options.svelte-px9gwf label.svelte-px9gwf.svelte-px9gwf{display:inline-block}.options.svelte-px9gwf label.svelte-px9gwf.svelte-px9gwf::before{content:attr(data-txt)}.options.svelte-px9gwf input[type="radio"].svelte-px9gwf:checked+label.svelte-px9gwf{display:none}.options.svelte-px9gwf input[type="radio"]#all.svelte-px9gwf:checked+label.svelte-px9gwf{display:none}.select.svelte-px9gwf:has(.options input[type="radio"]#all:checked) .selected.svelte-px9gwf.svelte-px9gwf::before{content:attr(data-default)}.select.svelte-px9gwf:has(.options input[type="radio"]#option-1:checked) .selected.svelte-px9gwf.svelte-px9gwf::before{content:attr(data-one)}.select.svelte-px9gwf:has(.options input[type="radio"]#option-2:checked) .selected.svelte-px9gwf.svelte-px9gwf::before{content:attr(data-two)}.select.svelte-px9gwf:has(.options input[type="radio"]#option-3:checked) .selected.svelte-px9gwf.svelte-px9gwf::before{content:attr(data-three)}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let items;
  let lowStockItems;
  let groupedItems;
  let $filteredInventory, $$unsubscribe_filteredInventory;
  $$unsubscribe_filteredInventory = subscribe(filteredInventory, (value) => $filteredInventory = value);
  let filter = { type: void 0 };
  let searchQuery2 = "";
  $$result.css.add(css);
  items = $filteredInventory(filter).filter((item) => item.name?.toLowerCase().includes(searchQuery2) || item.category?.toLowerCase().includes(searchQuery2));
  lowStockItems = items.filter((item) => item.quantity <= item.minStock);
  groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {}
  );
  $$unsubscribe_filteredInventory();
  return `<div class="space-y-6 ml-20 mr-20"><div class="flex justify-between items-center"><h2 class="text-4xl font-bold" data-svelte-h="svelte-1skpmkf">Inventario</h2>  ${validate_component(Searcher, "Searcher").$$render($$result, {}, {}, {})} <div class="flex gap-4"> <div class="select w-fit pointer text-white mr-24 mt-24 svelte-px9gwf"><div class="selected svelte-px9gwf" data-default="Todos los productos" data-one="Restaurante" data-two="Kiosko" data-svelte-h="svelte-di3fyi"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" class="arrow svelte-px9gwf"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path></svg></div> <div class="options svelte-px9gwf"><div title="Todos los productos"><input id="all" name="option" type="radio" value="todos" ${"checked"} class="svelte-px9gwf"> <label class="option svelte-px9gwf" for="all" data-txt="Todos los productos"></label></div> <div title="Productos del restaurante"><input id="option-1" name="option" type="radio" value="menu" ${""} class="svelte-px9gwf"> <label class="option svelte-px9gwf" for="option-1" data-txt="Productos del Restaurante"></label></div> <div title="Productos del kiosko"><input id="option-2" name="option" type="radio" value="kiosk" ${""} class="svelte-px9gwf"> <label class="option svelte-px9gwf" for="option-2" data-txt="Productos del kiosko"></label></div></div></div>  <label class="flex items-center gap-2"><input type="checkbox" class="rounded text-blue-600"${add_attribute("checked", filter.lowStock, 1)}>
        Mostrar solo suministros en escasez</label></div></div> ${lowStockItems.length > 0 ? `<div class="bg-yellow-50 border-l-4 border-yellow-400 p-4"><div class="flex"><div class="flex-shrink-0" data-svelte-h="svelte-1h5tvpf"><svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg></div> <div class="ml-3"><p class="text-sm text-yellow-700">${escape(lowStockItems.length)} items are running low on stock</p></div></div></div>` : ``}</div> ${validate_component(InventoryList, "InventoryList").$$render($$result, { groupedItems }, {}, {})}`;
});
export {
  Page as default
};
