<script lang="ts">
  import type { MenuItem } from '$lib/types/menu';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { cart } from '$lib/common/stores/cart';

  export let item: MenuItem;
  let menuItems
  
  function addToCart() {
  cart.addItem({
    menuItemId: item.id,
    quantity: 1
  });

  if ($page.url.pathname !== '/ordenar' && $page.url.pathname !== '/kiosko') {
    goto('/ordenar');
  }
}

</script>

<div class="bg-white div rounded-lg shadow-md overflow-hidden flex flex-col">
  <img src={item.image} alt={item.name} class="w-full h-72 object-cover" />
  <div class="p-4 flex flex-col flex-grow">
    <h3 class="text-xl font-semibold mb-2">{item.name}</h3>
    <p class="text-gray-600 mb-4 flex-grow">{item.description}</p>
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
