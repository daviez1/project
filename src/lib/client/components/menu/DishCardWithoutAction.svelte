<script lang="ts">
  import type { MenuItem } from '$lib/types/menu';
  import { goto } from '$app/navigation';
  
  export let item: MenuItem;
  
  function addToCart() {
    goto('/ordenar')
  }
</script>

<div class="bg-white rounded-lg shadow-md overflow-hidden">
  <img src={item.image} alt={item.name} class="w-full h-48 object-cover" />
  <div class="p-4">
    <h3 class="text-xl font-semibold mb-2">{item.name}</h3>
    <p class="text-gray-600 mb-4">{item.description}</p>
    <div class="flex justify-between items-center">
      <span class="text-lg font-bold">${item.price.toFixed(2)}</span>
      <button
        on:click={addToCart}
        disabled={!item.available}
        formaction="?/create"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Pedir
      </button>
    </div>
  </div>
</div>