<script lang="ts">
  import { inventory, filteredInventory } from '$lib/common/stores/inventory';
  import type { InventoryFilter } from '$lib/types/inventory';
  import InventoryList from '$lib/client/components/inventory/InventoryList.svelte';
  import Searcher from '$lib/client/components/form/Searcher.svelte';
  import { onMount } from 'svelte';

  let filter: InventoryFilter = { type: undefined };
  let searchQuery = '';
  let filterType: 'menu' | 'kiosk' | 'todos' | undefined = 'todos';

  function handleChange(event: any) {
    filterType = event.target.value as 'menu' | 'kiosk' | 'todos';
    filter.type = filterType === 'todos' ? undefined : filterType;
  }

  function handleSearch(event: CustomEvent) {
    searchQuery = event.detail.query.toLowerCase();
  }

  onMount(async () => {
    await inventory.fetchInventoryItems();
  });

  $: items = $filteredInventory(filter).filter(item =>
    item.name.toLowerCase().includes(searchQuery) ||
    item.category.toLowerCase().includes(searchQuery)
  );
  $: lowStockItems = items.filter(item => item.quantity <= item.minStock);

  // Agrupar elementos por categoría
  $: groupedItems = items.reduce((acc: any, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
</script>

<div class="space-y-6 ml-20 mr-20">
  <div class="flex justify-between items-center">
    <h2 class="text-4xl font-bold">Inventario</h2>
    <!-- Search Bar -->
    <Searcher on:search={handleSearch} />
    <div class="flex gap-4">
      <!-- Select -->
      <div class="select w-fit pointer text-white mr-24 mt-24">
        <div
          class="selected"
          data-default="Todos los productos"
          data-one="Restaurante"
          data-two="Kiosko"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            class="arrow"
          >
            <path
              d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
            ></path>
          </svg>
        </div>
        <div class="options">
          <div title="Todos los productos">
            <input id="all" name="option" type="radio" value="todos" checked={filterType === 'todos'} on:change={handleChange} />
            <label class="option" for="all" data-txt="Todos los productos"></label>
          </div>
          <div title="Productos del restaurante">
            <input id="option-1" name="option" type="radio" value="menu" checked={filterType === 'menu'} on:change={handleChange} />
            <label class="option" for="option-1" data-txt="Productos del Restaurante"></label>
          </div>
          <div title="Productos del kiosko">
            <input id="option-2" name="option" type="radio" value="kiosk" checked={filterType === 'kiosk'} on:change={handleChange} />
            <label class="option" for="option-2" data-txt="Productos del kiosko"></label>
          </div>
        </div>
      </div>
      <!-- Select -->
      <label class="flex items-center gap-2">
        <input
          type="checkbox"
          bind:checked={filter.lowStock}
          class="rounded text-blue-600"
        />
        Mostrar solo suministros en escasez
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
</div>

<InventoryList {groupedItems} />

  <style>
    .select {
      transition: 300ms;
      overflow: hidden;
    }
  
    .selected {
      background-color: #2a2f3b;
      padding: 5px;
      margin-bottom: 3px;
      border-radius: 5px;
      position: relative;
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  
    .arrow {
      position: relative;
      right: 0px;
      height: 10px;
      transform: rotate(-90deg);
      width: 25px;
      fill: white;
      z-index: 100000;
      transition: 300ms;
    }
  
    .options {
      display: flex;
      flex-direction: column;
      border-radius: 5px;
      padding: 5px;
      background-color: #2a2f3b;
      position: relative;
      opacity: 0;
      transition: 300ms;
    }
  
    .select:hover > .options {
      opacity: 1;
      top: 0;
    }
  
    .select:hover > .selected .arrow {
      transform: rotate(0deg);
    }
  
    .option {
      border-radius: 5px;
      padding: 5px;
      transition: 300ms;
      background-color: #2a2f3b;
      width: 150px;
      font-size: 15px;
    }
  
    .option:hover {
      background-color: #323741;
    }
  
    .options input[type="radio"] {
      display: none;
    }
  
    .options label {
      display: inline-block;
    }
  
    .options label::before {
      content: attr(data-txt);
    }
  
    .options input[type="radio"]:checked + label {
      display: none;
    }
  
  .options input[type="radio"]#all:checked + label {
    display: none;
  }
  
  .select:has(.options input[type="radio"]#all:checked) .selected::before {
    content: attr(data-default);
  }
  .select:has(.options input[type="radio"]#option-1:checked) .selected::before {
    content: attr(data-one);
  }
  .select:has(.options input[type="radio"]#option-2:checked) .selected::before {
    content: attr(data-two);
  }
  .select:has(.options input[type="radio"]#option-3:checked) .selected::before {
    content: attr(data-three);
  }
  </style>