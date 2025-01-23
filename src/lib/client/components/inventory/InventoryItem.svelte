<script lang="ts">
  import type { InventoryItem } from '$lib/types/inventory';
  import { inventory } from '$lib/common/stores/inventory';
  import mongoose from 'mongoose';
  import * as formErrors from '$lib/client/utils/formErrors';
  import { slide } from 'svelte/transition';

  export let item: InventoryItem;
  const _id: mongoose.Types.ObjectId | any = item._id;
  let isUpdating = false;
  let updateQuantity = 0;
  let updateRemoveError = formErrors.updateRemoveBigger.activate;

  function addStock() {
    if (updateQuantity <= 0) return;
    inventory.updateStock({
      id: item.id,
      quantity: updateQuantity,
      type: 'add'
    }, _id);
    isUpdating = false;
    updateQuantity = 0;
  }

  function removeStock() {
    if (updateQuantity <= 0) return;
    if (updateQuantity > item.quantity) return updateRemoveError = true;
    inventory.updateStock({
      id: item.id,
      quantity: updateQuantity,
      type: 'remove'
    }, _id);
    isUpdating = false;
    updateQuantity = 0;
  }
</script>

<div class="bg-gray-100 shadow-md p-0 flex flex-col sm:flex-row relative">
  <div class="w-full sm:w-1/2 p-2 text-center relative z-10 bg-gray-900 bg-opacity-75 rounded-l-lg shadow-lg">
    <h3 class="font-semibold text-xl md:text-2xl capitalize text-white">{item.name}</h3>
    <p class="text-md font-normal text-gray-300">{item.type === 'kiosk' ? 'Kiosko' : 'Restaurante'} - {item.category}</p>
    
    <div class="mt-4 space-y-2">
      <div class="flex justify-center">
        <span class="font-semibold text-lg md:text-xl text-white">Cantidad:</span>
        <span class="font-semibold text-lg md:text-xl ml-2 text-white" class:text-red-600={item.quantity <= item.minStock}>
          {item.quantity}
        </span>
      </div>
      
      <div class="flex justify-center">
        <span class="font-semibold text-lg md:text-xl text-white">Estado:</span>
        <span class="{item.available ? 'text-green-500' : 'text-red-500'} ml-2 text-md md:text-lg">
          {item.available ? 'Disponible' : 'No disponible'}
        </span>
      </div>
    </div>
    
    <div class="mt-2">
      <button
        class="text-stone-300 text-md"
        on:click={() => isUpdating = !isUpdating}
      >
        {isUpdating ? 'Cancelar' : 'Actualizar suministros'}
      </button>
      {#if isUpdating}
        <div in:slide = {{ duration: 200 }} out:slide = {{ duration: 200 }} class="mt-2 space-y-2">
          <input
            type="number"
            bind:value={updateQuantity}
            min="0"
            class="px-1 md:w-full rounded-lg border-gray-300"
            placeholder="Enter quantity"
          />
          
          <div class="flex gap-2">
            <button
              on:click={addStock}
              class="w-1/2 bg-green-600 text-white px-1 md:px-3 py-1 rounded-lg text-sm"
            >
              Agregar
            </button>
            <button
              on:click={removeStock}
              class="w-1/2 bg-red-600 text-white px-1 md:px-3 py-1 rounded-lg text-sm"
            >
              Eliminar
            </button>
          </div>
          {#if updateRemoveError}
            <p class="text-red-500 text-xs md:text-sm">{ formErrors.updateRemoveBigger.message }</p>
          {/if}
        </div>
      {/if}
    </div>
  </div>
  <div class="w-full sm:w-1/2 rounded-r-lg bg-black bg-opacity-75 hidden sm:flex justify-center items-center">
    <img 
      src={`/api/images/${item.image}`} 
      alt={item.name}
      class="w-full h-52 object-cover { isUpdating ? 'mr-4' : '' }  rounded-r-lg"
    />
  </div>
  <div class="absolute inset-0 bg-black bg-opacity-50 sm:hidden z-0">
    <img 
      src={`/api/images/${item.image}`} 
      alt={item.name}
      class="w-full h-full object-cover rounded-lg opacity-50"
    />
  </div>
</div>
