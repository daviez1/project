<script lang="ts">
  import type { InventoryItem } from '$lib/types/inventory';
  import { inventory } from '$lib/common/stores/inventory';
  import Hanoi from "../../../../../assets/Hanoi.jpg";
  
  export let item: InventoryItem;
  
  let isUpdating = false;
  let updateQuantity = 0;
  
  function addStock() {
    if (updateQuantity <= 0) return;
    inventory.updateStock({
      id: item.id,
      quantity: updateQuantity,
      type: 'add'
    });
    isUpdating = false;
    updateQuantity = 0;
  }
  
  function removeStock() {
    if (updateQuantity <= 0) return;
    inventory.updateStock({
      id: item.id,
      quantity: updateQuantity,
      type: 'remove'
    });
    isUpdating = false;
    updateQuantity = 0;
  }
</script>

<div class="bg-gray-100 rounded-lg shadow-md p-6 flex">
  <div class="w-1/2 p-4">
    <h3 class="font-semibold text-2xl text-center">{item.name}</h3>
    <p class="text-sm text-gray-600 text-center">{item.type} - {item.category}</p>
    
    <div class="mt-4 space-y-2">
      <div class="flex justify-center">
        <span class="font-semibold text-xl ml-2">Cantidad de suministros:</span>
        <span class="font-semibold text-xl ml-2" class:text-red-600={item.quantity <= item.minStock}>
          {item.quantity}
        </span>
      </div>
      
      <div class="flex justify-center">
        <span class="font-semibold mr-2 text-xl">Estado:</span>
        <span class="{item.available ? 'text-green-600' : 'text-red-600'} ml-2 text-xl">
          {item.available ? 'Disponible' : 'No disponible'}
        </span>
      </div>
    </div>
    
    <div class="mt-4 text-center">
      <button
        class="text-blue-600 text-md"
        on:click={() => isUpdating = !isUpdating}
      >
        {isUpdating ? 'Cancelar' : 'Actualizar suministros'}
      </button>
      
      {#if isUpdating}
        <div class="mt-2 space-y-2">
          <input
            type="number"
            bind:value={updateQuantity}
            min="0"
            class="w-full rounded-lg border-gray-300"
            placeholder="Enter quantity"
          />
          
          <div class="flex gap-2">
            <button
              on:click={addStock}
              class="flex-1 bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
            >
              Agregar
            </button>
            <button
              on:click={removeStock}
              class="flex-1 bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
            >
              Eliminar
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
  <div class="w-1/2 flex justify-center items-center">
    <img 
      src={Hanoi} 
      alt={item.name}
      class="w-full h-52 object-cover rounded-lg"
    />
  </div>
</div>
