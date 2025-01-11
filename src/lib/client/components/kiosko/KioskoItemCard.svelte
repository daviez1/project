<script lang="ts">
  import type { KioskoItem } from '$lib/types/kiosko';
  import { goto } from '$app/navigation';
  import { cart } from '$lib/common/stores/cart';

  export let item: KioskoItem;

  function addToCart() {
      cart.addItem({
        menuItemId: item.id,
        name: item.name,
        quantity: 1
      });
  }
</script>
  
<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
  <img src={item.image} alt={item.name} class="w-full h-48 object-cover" />
  <div class="p-4">
    <h3 class="text-lg font-semibold mb-1">{item.name}</h3>
    <p class="text-sm text-gray-600 mb-2">{item.description}</p>
    <div class="flex justify-between items-center">
      <span class="text-lg font-bold">${item.price.toFixed(2)}</span>
      <button
        on:click={addToCart}
        disabled={!item.available}
        class="bg-gray-500 text-white p-1 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {item.available ? 'Añadir a pedidos' : 'No disponible'}
      </button>
    </div>
  </div>
</div>