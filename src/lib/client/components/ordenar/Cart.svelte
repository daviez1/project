<script lang="ts">
  import { cart } from '$lib/common/stores/cart';
  import { Order } from '$lib/common/models/order';
  import { orders } from '$lib/common/stores/orders';
  import { createQuery } from '@tanstack/svelte-query';
  import { GetKioskoItems, GetMenuItems, GetOrdersLastId } from '$lib/common/constants/queries';
  import * as OrderTypes from "$lib/types/order";
  import ToastComplete from '../notifications/ToastComplete.svelte';
  import { getKioskoItem, getMenuItem } from '$lib/client/utils/getItemsFromCart';
  
  let showToast = false;
  let toastMessage = '';
  let newOrder: OrderTypes.Order = { id: '', items: [], status: 'pending', createdAt: new Date(), updatedAt: new Date(), total: 0 };

  const menuItemsQuery = createQuery({ 
  queryKey: [GetMenuItems], 
  queryFn: async () => await cart.fetchMenuItems()      
});
  const ordersLastIdQuery = createQuery({ 
  queryKey: [GetOrdersLastId], 
  queryFn: async () => {
   const ordersData:Order[] = await orders.fetchOrders();
   return ordersData[ordersData.length-1].id
  }      
});
  const kioskoItemsQuery = createQuery({ 
  queryKey: [GetKioskoItems], 
  queryFn: async () => await cart.fetchKioskoItems()      
});

    $: ordersLastId = $ordersLastIdQuery.data || ''; // Función para obtener un elemento del menú por su ID 
    $: menuItems = $menuItemsQuery.data || []; // Función para obtener un elemento del menú por su ID 
    $: kioskoItems = $kioskoItemsQuery.data || []; // Función para obtener un elemento del menú por su ID 
    
  // Componente Cart 
  $: items = $cart.map(item => ({
    ...item, 
    menuItem: getMenuItem(item.menuItemId, menuItems) ?? getKioskoItem(item.menuItemId,kioskoItems), 
  }));
  
  $: total = items.reduce((sum, item) => 
    sum + (item.menuItem?.price || 0) * item.quantity, 0
  );

  async function checkout() {
    if (items.length === 0) return;
    newOrder.id = String(Number(ordersLastId) + 1)
    newOrder.items = items
    newOrder.total = total
    orders.post(newOrder);
    cart.clear();
    // Muestra el toast
    toastMessage = 'Pedido confirmado!';
    showToast = true;
    setTimeout(() => {
      showToast = false;
    }, 3000);
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
    <ToastComplete type={'success'} message={toastMessage} onClose={closeToast} />
  {/if}
</div>