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

<div class="div w-100 rounded-lg shadow-md overflow-hidden m-auto mb-5 border flex flex-col bg-white">
  <img src={item.image} alt={item.name} class="w-full p-2 block h-80 object-cover" />
  <div class="p-4 flex flex-col flex-grow h-40 ">
    <h3 class="text-xl font-semibold mb-2 capitalize">{item.name}</h3>
    <p class="text-gray-600 mb-1 flex-grow">{item.description}</p>
    <div class="mt-auto flex justify-between items-center">
      <span class="text-lg font-bold">${item.price.toFixed(2)}</span>
      <button
        on:click={addToCart}
        disabled={!item.available}
        class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
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