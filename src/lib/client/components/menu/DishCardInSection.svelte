<script lang="ts">
  import type { MenuItem } from '$lib/types/menu';
  import { cart } from '$lib/common/stores/cart';
  import { capitalize } from '$lib/client/utils/capitalize';
  import type { KioskoItem } from '$lib/types/kiosko';
  import { animate__pulse_infinite } from '$lib/common/constants/animate';
  import { slide } from 'svelte/transition';

  export let item: MenuItem | KioskoItem;
  let showModal = false;

  function addToCart() {
    cart.addItem({
      menuItemId: item.id,
      name: item.name,
      quantity: 1
    });
  }

  function toggleModal() {
    showModal = !showModal;
  }
</script>

<div in:slide|global={{duration:400}} class="w-full rounded-lg shadow-md overflow-hidden mx-auto border flex flex-col bg">
  <div class="p-4 flex flex-col flex-grow h-fit">
    <div class="flex flex-col sm:flex-row justify-between items-center mb-2">
      <div class="flex justify-between w-full">
        <h3 class="text-md md:text-xl font-semibold capitalize">{item.name}</h3>
        <span class="text-sm md:text-lg font-bold">Precio: ${item.price.toFixed(2)}</span>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row justify-between items-center mb-1 flex-grow">
      <p class="text-gray-600 w-full sm:w-8/12 sm:w-70%">{capitalize(item.description)}</p>
      <button
        on:click={addToCart}
        disabled={!item.available}
        class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-3/12 sm:w-30% mt-2 sm:mt-0"
      >
        {item.available ? 'Pedir' : 'Agotado'}
      </button>
    </div>
    <button on:click={toggleModal} class="text-center mr-4 text-xs md:text-sm text-green-800 hover:underline { animate__pulse_infinite } mt-2 sm:mt-0">Ver imagen de { capitalize( item.name ) }</button>
  </div>
</div>

{#if showModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" on:click={toggleModal}>
    <div class="bg-gray-100 p-2 rounded-lg shadow-lg max-w-lg w-11/12 sm:w-3/5 h-fit relative" on:click|stopPropagation>
      <button on:click={toggleModal} class="absolute top-2 right-2 text-4xl text-red-500 hover:text-gray-700 bg-gray-100 h-12 w-12 rounded border">
        &times;
      </button>
      <img src={`/api/images/${item.image}`} alt="image" class="w-full h-96 object-cover rounded-lg" />
    </div>
  </div>
{/if}

<style>
  .bg {
    background-image: linear-gradient(90deg, rgb(255,255,255) 0%, transparent 66%), repeating-linear-gradient(45deg, rgba(114, 114, 114, 0.08) 0px, rgba(114, 114, 114, 0.08) 1px, transparent 1px, transparent 16px), repeating-linear-gradient(90deg, rgba(114, 114, 114, 0.08) 0px, rgba(114, 114, 114, 0.08) 1px, transparent 1px, transparent 16px), repeating-linear-gradient(135deg, rgba(114, 114, 114, 0.08) 0px, rgba(114, 114, 114, 0.08) 1px, transparent 1px, transparent 16px), linear-gradient(0deg, rgb(255,255,255), rgb(255,255,255));
  }
</style>
