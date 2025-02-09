<script lang="ts">
  import { inventory, filteredInventory } from '$lib/common/stores/inventory';
  import type { InventoryFilter } from '$lib/types/inventory';
  import InventoryList from '$lib/client/components/inventory/InventoryList.svelte';
  import Searcher from '$lib/client/components/form/Searcher.svelte';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import Select from '$lib/client/components/form/Select.svelte';

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
    item.name?.toLowerCase().includes(searchQuery) ||
    item.category?.toLowerCase().includes(searchQuery)
  );
  $: lowStockItems = items.filter(item => item.quantity <= item.minStock);

  $: groupedItems = items.reduce((acc: any, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
</script>

<svelte:head>
  <title>Inventario</title>
</svelte:head>

<div class="space-y-6 mx-2 md:mx-20 mt-20">
  <div class="flex flex-col md:flex-row mt-20 md:mt-4 justify-between items-center flex-wrap">
    <h2 class="text-2xl md:text-2xl lg:text-3xl font-bold text-gradient-primary">Inventario</h2>
    <!-- Search Bar -->
    <Searcher on:search={handleSearch} />
    <div class="flex flex-col md:flex-row md:justify-between gap-4 md:gap-40 mt-4 md:mt-0 w-full md:w-auto items-center">
      <!-- Select -->
      <Select {filterType} handleChange={handleChange} />
      <!-- Select -->
      <label class="flex items-center text-sm md:text-md">
        <input
        type="checkbox"
        bind:checked={filter.lowStock}
        class="rounded text-blue-600 mr-2"
        />
        Mostrar solo suministros en escasez
      </label>
    </div>
  </div>

  {#if lowStockItems.length > 0}
    <div in:slide = {{ duration: 200 }} out:slide = {{ duration: 100 }} class="bg-yellow-50 mx-auto lg:mx-0 border-l-4 w-full md:w-fit border-yellow-400 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a 1 1 0 002 0V6a 1 1 0 00-1-1z" clip-rule="evenodd" />
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
