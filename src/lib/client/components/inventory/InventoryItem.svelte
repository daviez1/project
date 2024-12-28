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
  
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex items-center gap-4">
      <img 
        src={Hanoi} 
        alt={item.name}
        class="w-20 h-20 object-cover rounded-lg"
      />
      <div>
        <h3 class="font-semibold">{item.name}</h3>
        <p class="text-sm text-gray-600">{item.type} - {item.category}</p>
      </div>
    </div>
    
    <div class="mt-4 space-y-2">
      <div class="flex justify-between">
        <span>Current Stock:</span>
        <span class="font-semibold" class:text-red-600={item.quantity <= item.minStock}>
          {item.quantity}
        </span>
      </div>
      
      <div class="flex justify-between">
        <span>Estado:</span>
        <span class={item.available ? 'text-green-600' : 'text-red-600'}>
          {item.available ? 'Disponible' : 'No disponible'}
        </span>
      </div>
    </div>
    
    <div class="mt-4">
      <button
        class="text-blue-600 text-sm"
        on:click={() => isUpdating = !isUpdating}
      >
        {isUpdating ? 'Cancel' : 'Update Stock'}
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
              Add
            </button>
            <button
              on:click={removeStock}
              class="flex-1 bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>