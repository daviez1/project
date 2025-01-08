<script lang="ts">
  import { filteredInventory, inventory } from '$lib/common/stores/inventory';
  import type { InventoryFilter, InventoryItem } from '$lib/types/inventory';
  import InventoryItemComponent from './InventoryItem.svelte';
  import SeeMore from '../form/SeeMore.svelte';
  import FormAddInventoryItem from '../form/FormAddInventoryItem.svelte';
  import { onMount } from 'svelte';

  onMount( ()=> console.log('montado'));

  export let groupedItems;
  let filter: InventoryFilter = { type: undefined };
  let searchQuery = '';

  async function handleItemAdded(event: CustomEvent) {
    const newItem: InventoryItem = event.detail.item;
    await inventory.addInventoryItem(newItem);
  }

  $: items = $filteredInventory(filter).filter(item =>
    (item.name?.toLowerCase() || '').includes(searchQuery) ||
    (item.category?.toLowerCase() || '').includes(searchQuery)
  );
  $: lowStockItems = items.filter(item => item.quantity <= item.minStock);
</script>

<!--Divisor de lista y gestion  -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-8">
  <ul class="inline">
    {#each Object.keys(groupedItems) as category}
      <li class="rounded-lg p-1 mb-2 shadow-md">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="font-bold text-2xl capitalize text-gray-600 ml-2">{category}</h3>
          </div>
          <SeeMore/>
        </div>
        <div class="details hidden mt-4">
          <ul class="space-y-2">
            {#each groupedItems[category] as item (item.id)}
              <li>
                <InventoryItemComponent {item} />
              </li>
            {/each}
          </ul>
        </div>
      </li>
    {/each}
  </ul>
  <FormAddInventoryItem on:itemAdded={handleItemAdded} />
</div>
