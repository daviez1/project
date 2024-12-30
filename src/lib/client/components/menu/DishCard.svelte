<script lang="ts">
  import type { MenuItem } from '$lib/types/menu';
  import { cart } from '$lib/common/stores/cart';
  import { fade, fly } from 'svelte/transition';

  export let item: MenuItem;
        
  function addToCart() {
  cart.addItem({
    menuItemId: item.id,
    name: item.name,
    quantity: 1
  });
  
}

</script>

<div in:fade={{ duration: 500 }} out:fly={{ x: 200, duration: 500 }} class="div w-80 rounded-lg shadow-md overflow-hidden m-auto mb-5 border flex flex-col">
  <img src={item.image} alt={item.name} class="w-80 block h-72 object-cover" />
  <div class="p-4 flex flex-col flex-grow h-48">
    <h3 class="text-xl font-semibold mb-2">{item.name}</h3>
    <p class="text-gray-600 mb-1 flex-grow">{item.description}</p>
    <div class="mt-auto flex justify-between items-center">
      <span class="text-lg font-bold">${item.price.toFixed(2)}</span>
      <button
        on:click={addToCart}
        disabled={!item.available}
        class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {item.available ? 'Pedir' : 'Agotado'}
      </button>
    </div>
  </div>
</div>

<style> 
  .div{
    width: 20em;
  }
</style>