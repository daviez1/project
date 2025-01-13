<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { inventory } from '$lib/common/stores/inventory';
  import type { InventoryItem } from '$lib/types/inventory';
  import ToastComplete from "$lib/client/components/notifications/ToastComplete.svelte";
  import * as formErrors from '$lib/client/utils/formErrors';

  let items: InventoryItem[] = [];
  let showToast = false;
  let stockInvalid = formErrors.stockInvalid.activate;
  let productExistActivate = formErrors.productExist.activate;
  let showError = false;
  const onClose = () => {
    showToast = false;
  }

  onMount(async () => {
    items = await inventory.fetchInventoryItems();
  });

  const dispatch = createEventDispatcher();

  let newProduct: InventoryItem = {
    id: '',
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    type: 'menu',
    category: '',
    image: '',
    available: true,
    minStock: 0,
    maxStock: 0,
    lastRestocked: new Date()
  };

  function addProduct() {
    if (newProduct.maxStock <= newProduct.minStock) return stockInvalid = true;  
    stockInvalid = false;

    const productExist = items.find( item => item.name == newProduct.name )
    if (productExist) return productExistActivate = true

    // Encontrar el ID más alto en el array de items
    const highestId = items.reduce((max, item) => Math.max(max, Number(item.id)), 0);
    newProduct.id = String(highestId + 1);


    // Agregar el nuevo producto al inventario
    // inventory.addInventoryItem(newProduct);
    dispatch('itemAdded', { item: newProduct });

    // Reiniciar el formulario
    newProduct = {
      id: '',
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      type: 'menu',
      category: '',
      image: '',
      available: true,
      minStock: 0,
      maxStock: 0,
      lastRestocked: new Date()
    };


    // for (const item of items) {
    //   let itemExist = item.name == newProduct.name;

    // }

    showToast = true;
    setTimeout(() => {
      showToast = false;
    }, 4000);
  }
</script>

<div class="inline mx-8 h-fit shadow-md p-4 mb-20 bg-gray-100">
  <h1 class="text-3xl font-bold text-center mb-8 text-gray-600">Gestión de productos</h1>
  <form on:submit|preventDefault={addProduct} class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Nombre del producto</label>
      <input type="text" id="name" bind:value={newProduct.name} class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Nombre del producto" required />
      {#if productExistActivate}
        <p class="text-red-500 text-sm mt-1">{formErrors.productExist.message}</p>
      {/if}
    </div>
    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
      <textarea id="description" bind:value={newProduct.description} class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Descripción del producto" required></textarea>
    </div>
    <div>
      <label for="price" class="block text-sm font-medium text-gray-700">Precio</label>
      <input type="number" id="price" bind:value={newProduct.price} class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Precio" required />
    </div>
    <div>
      <label for="quantity" class="block text-sm font-medium text-gray-700">Cantidad</label>
      <input type="number" id="quantity" bind:value={newProduct.quantity} class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Cantidad" required />
    </div>
    <div>
      <label for="type" class="block text-sm font-medium text-gray-700">Tipo</label>
      <select id="type" bind:value={newProduct.type} class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        <option value="menu">Restaurante</option>
        <option value="kiosk">Kiosko</option>
      </select>
    </div>
    <div>
      <label for="category" class="block text-sm font-medium text-gray-700">Categoría</label>
      <input type="text" id="category" bind:value={newProduct.category} class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Categoría" required />
    </div>
    <div>
      <label for="image" class="block text-sm font-medium text-gray-700">Imagen (URL)</label>
      <input type="text" id="image" bind:value={newProduct.image} class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="URL de la imagen" required />
    </div>
    <div>
      <label for="minStock" class="block text-sm font-medium text-gray-700">Stock mínimo</label>
      <input type="number" id="minStock" bind:value={newProduct.minStock} class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Stock mínimo" required />
    </div>
    <div>
      <label for="maxStock" class="block text-sm font-medium text-gray-700">Stock máximo</label>
      <input type="number" id="maxStock" bind:value={newProduct.maxStock} class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Stock máximo" required />
      {#if stockInvalid}
        <p class="text-red-500 text-sm mt-1">{formErrors.stockInvalid.message}</p>
      {/if}
    </div>
    <div>
      <label for="available" class="block text-sm font-medium text-gray-700">Disponible</label>
      <input type="checkbox" id="available" bind:checked={newProduct.available} class="mt-1 block rounded-md border-gray-300 shadow-sm" />
    </div>
    <button type="submit" class="w-full bg-gray-700 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700">Agregar producto</button>
  </form>
  {#if showToast}
    <ToastComplete message="Creado con éxito" type="success" onClose={onClose}/>
  {/if}
</div>

<style>
  input, select, textarea {
    padding: .3em;
  }
</style>
