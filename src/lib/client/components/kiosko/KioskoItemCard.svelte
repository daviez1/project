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
        class="bg-green-500 text-white p-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {item.available ? 'Añadir a pedidos' : 'No disponible'}
      </button>
      <button
        on:click={()=> goto('/ordenar')}
        disabled={!item.available}
        class="bg-green-500 text-white p-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Ver Pedidos
      </button>

    </div>
  </div>
</div>

<style>
  button{
    height: fit-content;
    width: fit-content;
    padding: 0 1.2px;
    margin: 0 0 0 4px;
  }
</style>