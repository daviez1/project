<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { inventory } from '$lib/common/stores/inventory';
  import type { InventoryItem } from '$lib/types/inventory';
  import ToastComplete from "$lib/client/components/notifications/ToastComplete.svelte";
  import * as formErrors from '$lib/client/utils/formErrors';
  import { capitalize } from '$lib/client/utils/capitalize';

  let categories = ['entrantes' , 'platos fuertes' , 'acompañantes' , 'bebidas' , 'menu infantil' , 'especiales del dia' , 'vegetarianas' , 'Sin gluten/Sin lactosa' , 'postres']
  let showToast = false;
  let stockInvalid = formErrors.stockInvalid.activate;
  let productExistActivate = formErrors.productExist.activate;
  let items: InventoryItem[] = []

  const onClose = () => showToast = false
  
  onMount(async () => {
    items = await inventory.fetchInventoryItems()
    console.log(String(items.length + 1));
  });

  const dispatch = createEventDispatcher();

  let newProduct: InventoryItem = {
    id: '',
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    type: 'menu',
    category: 'entrantes',
    image: '',
    available: true,
    minStock: 0,
    maxStock: 0,
    lastRestocked: new Date()
  };

  async function addProduct() {
    if (newProduct.maxStock <= newProduct.minStock) return stockInvalid = true;  
    stockInvalid = false;

    const productExist = $inventory.find( item => item.name == newProduct.name )
    if (productExist) return productExistActivate = true

    // Cargar la imagen a MongoDB usando GridFS
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/uploads', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      newProduct.image = result.fileId; // Asigna el ID del archivo cargado
    }

    // Agregar el nuevo producto al inventario
    console.log(newProduct);
    
    dispatch('itemAdded', { item: newProduct });

    // Reiniciar el formulario
    newProduct = {
      // id: String(items.length + 1),
      id: '',
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      type: 'menu',
      category: 'entrantes',
      image: '',
      available: true,
      minStock: 0,
      maxStock: 0,
      lastRestocked: new Date()
    };

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
      <select id="category"  bind:value={newProduct.category} class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        {#each categories as category }
        <option value={category} class="capitalize">{capitalize( category )}</option>
        {/each}
        </select>
    </div>
    <div> 
      <label for="image" class="block text-sm font-medium text-gray-700">Imagen</label> 
      <input type="file" id="image" bind:value={newProduct.image} class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Inserte la imagen" required /> 
      <!-- <input type="file" id="image" class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" required />  -->
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
