<script lang="ts">
  import { cart } from '$lib/common/stores/cart';
  import { getKioskoItemQuery } from '$lib/common/data/kiosko';
  import Toast from '$lib/client/components/notifications/Toast.svelte';
  import { onMount } from 'svelte';
  import { Order } from '$lib/common/models/order';
  import { orders } from '$lib/common/stores/orders';
  import { createQuery } from '@tanstack/svelte-query';
  import { GetKioskoItems, GetMenuItems } from '$lib/common/constants/queries';
  import { getMenuItemQuery } from '$lib/common/data/menu';

  let counterId = 3;
  let showToast = false;
  let toastMessage = '';
  let ordersDB: Order[] = [];
  let newOrder: Order = { id: '', items: [], status: 'pending', createdAt: new Date(), updatedAt: new Date(), total: 0 };

  const menuItemsQuery = createQuery({ 
  queryKey: [GetMenuItems], 
  queryFn: async () => await cart.fetchMenuItems()      
});
  const kioskoItemsQuery = createQuery({ 
  queryKey: [GetKioskoItems], 
  queryFn: async () => await cart.fetchKioskoItems()      
});

  onMount(async () => {
    ordersDB = await orders.getOrder();
    });

    $: menuItems = $menuItemsQuery.data || []; // Función para obtener un elemento del menú por su ID 
    $: kioskoItems = $kioskoItemsQuery.data || []; // Función para obtener un elemento del menú por su ID 
    
      // Componente Cart 
    $: items = $cart.map(item => ({
       ...item, 
       menuItem: getMenuItemQuery(item.menuItemId, menuItems) ?? getKioskoItemQuery(item.menuItemId,kioskoItems), 
      }));

  // El $ de $cart es para suscribirse a los cambios del writable
  // $: items = $cart.map(item => ({
  //   ...item,
  //   menuItem: getMenuItem(item.menuItemId) ?? getKioskoItem(item.menuItemId),
  // }));
  
  $: total = items.reduce((sum, item) => 
    sum + (item.menuItem?.price || 0) * item.quantity, 0
  );

  async function checkout() {
    if (items.length === 0) return;
    newOrder.id = String(counterId+=1)
    newOrder.items = items
    newOrder.total = total
    orders.addOrderDB(newOrder);
    cart.clear();
    // Muestra el toast
    toastMessage = 'Pedido confirmado!';
    showToast = true;
  }

  function closeToast() {
    showToast = false;
  }
</script>

<div class="bg-white div mt-5 rounded-lg shadow-md p-6">
  <h2 class="text-2xl font-bold text-gray-700 mb-6">Sus pedidos</h2>
  
  {#if items.length === 0}
    <p class="text-gray-500 text-center py-4">No ha realizado ningún pedido</p>
  {:else}
    <div class="space-y-4 mb-6">
      {#each items as item}
        <div class="flex justify-between items-center">
          <div>
            <h3 class="font-semibold">{item.menuItem?.name}</h3>
            <p class="text-sm text-gray-600">Cantidad: {item.quantity}</p>
          </div>
          <div class="text-right">
            <p class="font-semibold">${((item.menuItem?.price || 0) * item.quantity).toFixed(2)}</p>
            <button
              class="text-sm text-red-600 hover:text-red-700"
              on:click={() => cart.removeItem(item.menuItemId)}
            >
              Cancelar
            </button>
          </div>
        </div>
      {/each}
    </div>
    
    <div class="border-t pt-4">
      <div class="flex justify-between items-center mb-6">
        <span class="text-lg font-bold">Total:</span>
        <span class="text-lg font-bold">${total.toFixed(2)}</span>
      </div>
      
      <button
        on:click={checkout}
        class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
      >
        Confirmar
      </button>
    </div>
  {/if}

  {#if showToast}
    <Toast message={toastMessage} onClose={closeToast} />
  {/if}
</div>