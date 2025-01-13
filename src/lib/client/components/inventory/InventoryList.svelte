<script lang="ts">
  import { filteredInventory, inventory } from '$lib/common/stores/inventory';
  import type { InventoryFilter, InventoryItem } from '$lib/types/inventory';
  import InventoryItemComponent from './InventoryItem.svelte';
  import SeeMore from '../form/SeeMore.svelte';
  import FormAddInventoryItem from '../form/FormAddInventoryItem.svelte';
  import Empty from '../form/Empty.svelte';
  import DeleteIcon from '../icons/DeleteIcon.svelte';
  import EditIcon from '../icons/EditIcon.svelte';
  import Modal from '$lib/client/components/form/Modal.svelte'; // Importa el componente Modal
  import ToastComplete from '$lib/client/components/notifications/ToastComplete.svelte'; // Importa el componente ToastComplete
  import { blur, crossfade, draw, fade, fly, scale, slide } from 'svelte/transition'; // Importa la transición fly

  export let groupedItems;
  let filter: InventoryFilter = { type: undefined };
  let searchQuery = '';
  let showModal = false;
  let showToast = false;
  let categoryToDelete = '';
  let expandedCategory = '';

  async function handleItemAdded(event: CustomEvent) {
    const newItem: InventoryItem = event.detail.item;
    await inventory.addInventoryItem(newItem);
  }

  function confirmDelete(category: string) {
    categoryToDelete = category;
    showModal = true;
  }

  async function handleDelete() {
    await inventory.deleteInventoryItem(categoryToDelete);
    showModal = false;
    showToast = true;
    setTimeout(() => showToast = false, 3000); // Ocultar el toast después de 3 segundos
  }

  function toggleDetails(category: string) {
    expandedCategory = expandedCategory === category ? '' : category;
  }

  $: items = $filteredInventory(filter).filter(item =>
    (item.name?.toLowerCase() || '').includes(searchQuery) ||
    (item.category?.toLowerCase() || '').includes(searchQuery)
  );
  $: lowStockItems = items.filter(item => item.quantity <= item.minStock);
</script>

<!--Divisor de lista y gestion  -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-8 rounded">
  <ul class="inline grid grid-cols-1 gap-4 h-fit py-4 px-0 rounded">
    {#if Object.keys(groupedItems).length > 0}
      {#each Object.keys(groupedItems) as category}
        <li class="bg-gray-100 rounded-lg p-1 mb-2 shadow-md w-full">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="font-bold text-2xl capitalize text-gray-600 ml-2">{category}</h3>
            </div>
            <div class="flex items-center">
              <button class="mr-4"><EditIcon /></button>
              <button on:click={() => confirmDelete(category)} class="mr-4"><DeleteIcon /></button>
              <SeeMore toogleDetail={() => toggleDetails(category)} />
            </div>
          </div>
          {#if expandedCategory === category}
            <div class="details mt-4" out:slide={{ duration: 200 }} in:slide={{ duration: 400 }}>
              <ul class="space-y-2">
                {#each groupedItems[category] as item (item.id)}
                  <li>
                    <InventoryItemComponent {item} />
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        </li>
      {/each}
    {:else}
      <Empty /> 
    {/if}
  </ul>
  <FormAddInventoryItem on:itemAdded={handleItemAdded} />
</div>

<!-- Modal de confirmación -->
{#if showModal}
  <Modal on:close={() => showModal = false}>
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Confirmar eliminación</h2>
      <p>¿Estás seguro de que deseas eliminar la categoría <strong>{categoryToDelete}</strong>?</p>
      <p class="alert">
        <svg class="w-5 h-5 inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
        </svg>
        También se eliminarán todos los productos de esa categoría</p>
      <div class="flex justify-end mt-4">
        <button on:click={() => showModal = false} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">Cancelar</button>
        <button on:click={handleDelete} class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Eliminar</button>
      </div>
    </div>
  </Modal>
{/if}

<!-- Toast de confirmación -->
{#if showToast}
  <ToastComplete message="Categoría eliminada con éxito" type="success" onClose={() => showToast = false} />
{/if}

<style>
  .alert {
    color: red;
  }
</style>
