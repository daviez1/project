<script lang="ts">
    import { inventory, filteredInventory } from '$lib/common/stores/inventory';
    import type { InventoryFilter } from '$lib/types/inventory';
    import InventoryItem from '$lib/client/components/inventory/InventoryItem.svelte';
  import InventoryList from '$lib/client/components/inventory/InventoryList.svelte';
    
    let filter: InventoryFilter = {};
    
    $: items = $filteredInventory(filter);
    $: lowStockItems = items.filter(item => item.quantity <= item.minStock);
  </script>

  <InventoryList/>

  <!-- <div class="space-y-6 mt-24">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold ml-20">Inventory Management</h2>
      <div class="flex gap-4 mr-20">
        <select 
          bind:value={filter.type}
          class="rounded-lg border-gray-300"
        >
          <option value={undefined}>All Types</option>
          <option value="menu">Menu Items</option>
          <option value="kiosk">Kiosk Items</option>
        </select>
        
        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            bind:checked={filter.lowStock}
            class="rounded text-blue-600"
          />
          Show Low Stock Only
        </label>
      </div>
    </div>
  
    {#if lowStockItems.length > 0}
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-700">
              {lowStockItems.length} items are running low on stock
            </p>
          </div>
        </div>
      </div>
    {/if}
  
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each items as item (item.id)}
        <InventoryItem {item} />
      {/each}
    </div>
  </div> -->