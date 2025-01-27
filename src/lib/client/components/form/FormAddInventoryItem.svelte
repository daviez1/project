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
  let fileInput: HTMLInputElement;
      let fileName: string = '';
    
      function triggerFileInput() {
        fileInput.click();
      }
    
      function handleFileChange(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
          fileName = target.files[0].name;
        } else {
          fileName = '';
        }
      }

  const onClose = () => showToast = false
  
  onMount(async () => {
    items = await inventory.fetchInventoryItems();
  });

  const dispatch = createEventDispatcher();

  let newProduct: InventoryItem = {id: '', name: '', description: '', price: 0, quantity: 0, type: 'menu', category: 'entrantes', image: '', available: true, minStock: 0, maxStock: 0, lastRestocked: new Date()};

  async function addProduct() {
    if (newProduct.maxStock <= newProduct.minStock) return stockInvalid = true;  
    
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
    dispatch('itemAdded', { item: newProduct });

    // Reiniciar el formulario
    newProduct = {
      // id: String(items.length + 1),
      id: '', name: '', description: '', price: 0, quantity: 0, type: 'menu', category: 'entrantes', image: '', available: true, minStock: 0, maxStock: 0, lastRestocked: new Date()};

    showToast = true;
    setTimeout(() => { showToast = false;}, 4000);
  }
</script>

<div class="inline mx-0 md:mx-8 h-fit rounded-xl shadow-md w-vdw md:p-4 mb-4 bg">
  <h1 class="text-lg md:text-2xl lg:text-3xl font-bold text-center mb-8 text-gradient">Gestión de productos</h1>
  <form on:submit|preventDefault={addProduct} class="px-3 space-y-4 py-3 md:py-0">
    <div class="relative">
      <input type="text" id="name" bind:value={newProduct.name} class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 peer" placeholder=" " required />
      <label for="name" class="absolute left-0 -top-3.5 text-gray-700 text-xs md:text-sm transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-gray-700 peer-focus:text-xs">Nombre del producto</label>
      {#if productExistActivate}
        <p class="text-red-500 text-xs md:text-sm mt-1">{formErrors.productExist.message}</p>
      {/if}
    </div>
    <div class="relative">
      <textarea id="description" bind:value={newProduct.description} class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 peer" placeholder=" " required></textarea>
      <label for="description" class="absolute left-0 -top-3.5 text-gray-700 text-xs transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-gray-700 peer-focus:text-xs md:text-sm">Descripción</label>
    </div>
    <div class="relative">
      <input type="number" id="price" bind:value={newProduct.price} min="0" class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 peer" placeholder="Precio" required />
      <label for="price" class="absolute left-0 -top-3.5 text-gray-700 text-xs transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-gray-700 peer-focus:text-xs md:text-sm">Precio</label>
      {#if productExistActivate}
      <p class="text-red-500 text-xs md:text-sm mt-1">{formErrors.productExist.message}</p>
      {/if}
    </div>
    <div>
      <label for="quantity" class="block text-xs md:text-sm font-medium text-gray-700">Cantidad</label>
      <input type="number" id="quantity" bind:value={newProduct.quantity} min="0" class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50" placeholder="Cantidad" required />
    </div>
    <div>
      <label for="type" class="block text-xs md:text-sm font-medium text-gray-700">Tipo</label>
      <select id="type" bind:value={newProduct.type} class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 text-sm md:text-lg">
        <option value="menu">Restaurante</option>
        <option value="kiosk">Kiosko</option>
      </select>
    </div>
    <div>
      <label for="category" class="block text-xs md:text-sm font-medium text-gray-700">Categoría</label>
      <select id="category"  bind:value={newProduct.category} class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 text-sm md:text-lg">
        {#each categories as category }
        <option value={category} class="capitalize">{capitalize( category )}</option>
        {/each}
        </select>
    </div>   
    <div class="flex flex-col border-b gap-2"> 
      <label for="image" class="text-xs md:text-sm font-medium text-gray-700">Imagen</label> 
      <input 
        type="file" 
        id="image" 
        bind:this={fileInput} 
        class="hidden" 
        bind:value={newProduct.image} 
        on:change={handleFileChange}
        required 
      /> 
      <button 
        type="button" 
        on:click={triggerFileInput} 
        class="mt-1 w-2/5 bg-gray-500 text-white font-semibold py-1 md:py-2 px-2 rounded-lg shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-white-400 focus:ring-opacity-50 text-sm"
      >
        Seleccionar archivo
      </button>
      {#if fileName}
        <p class="mt-1 sm:mt-0 text-xs md:text-sm text-gray-600">Archivo seleccionado: {fileName}</p>
      {/if}
    </div>               
    <div>
      <label for="minStock" class="block text-xs md:text-sm font-medium text-gray-700">Stock mínimo</label>
      <input type="number" id="minStock" bind:value={newProduct.minStock} min="0" class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50" placeholder="Stock mínimo" required />
    </div>
    <div>
      <label for="maxStock" class="block text-xs md:text-sm font-medium text-gray-700">Stock máximo</label>
      <input type="number" id="maxStock" bind:value={newProduct.maxStock} min="0" class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50" placeholder="Stock máximo" required />
      {#if stockInvalid}
        <p class="text-red-500 text-xs md:text-sm mt-1">{formErrors.stockInvalid.message}</p>
      {/if}
    </div>
    <div>
      <label for="available" class="block text-xs md:text-sm font-medium text-gray-700">Disponible</label>
      <input type="checkbox" id="available" bind:checked={newProduct.available} class="mt-1 block rounded-md border-gray-300 shadow-sm" />
    </div>
    <div class="flex justify-center">
      <button type="submit" class="w-3/5 md:w-full bg-gray-700 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-700">Agregar producto</button>
    </div>    
  </form>
  {#if showToast}
    <ToastComplete message="Creado con éxito" type="success" onClose={onClose}/>
  {/if}
</div>

<style>
  input, select, textarea {
    padding: .3em;
  }
  input:focus {
  outline: none;
  }
  textarea:focus {
  outline: none;
  }
  .bg{
    background-image: radial-gradient(circle at 51% 29%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 3%,transparent 3%, transparent 100%),radial-gradient(circle at 95% 73%, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.03) 3%,transparent 3%, transparent 100%),radial-gradient(circle at 66% 49%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 3%,transparent 3%, transparent 100%),radial-gradient(circle at 89% 3%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 3%,transparent 3%, transparent 100%),radial-gradient(circle at 84% 66%, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.01) 3%,transparent 3%, transparent 100%),radial-gradient(circle at 85% 96%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 26% 14%, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.01) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 59% 13%, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.03) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 21% 44%, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.01) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 9% 11%, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.01) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 70% 60%, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.01) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 27% 19%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 33% 2%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 91% 36%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 5%,transparent 5%, transparent 100%),radial-gradient(circle at 100% 8%, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.01) 5%,transparent 5%, transparent 100%),radial-gradient(circle at 87% 65%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 5%,transparent 5%, transparent 100%),radial-gradient(circle at 36% 37%, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.03) 5%,transparent 5%, transparent 100%),radial-gradient(circle at 89% 79%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 5%,transparent 5%, transparent 100%),linear-gradient(90deg, hsla(245,0%,100%,1),hsla(230,0%,100%,1));
  }
</style>