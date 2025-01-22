<script lang="ts">
  import type { Order } from '$lib/types/order';
  import { translateStatusBtn, translateStatusSpan } from '$lib/client/utils/translate';
  import { statusPlus } from '$lib/client/utils/statusPlus';
  import ToastComplete from '../notifications/ToastComplete.svelte';
  import { orders } from '$lib/common/stores/orders';
  import { createQuery } from '@tanstack/svelte-query';
  import { GetKioskoItems, GetMenuItems, GetOrders } from '$lib/common/constants/queries';
  import { cart } from '$lib/common/stores/cart';
  import mongoose from 'mongoose';
  import { getKioskoItem, getMenuItem } from '$lib/client/utils/getItemsFromCart';
  import { statusColors, statusColorsPlus } from '$lib/common/constants/ordersColors';
  import { writable } from 'svelte/store';

  export let order: Order;
  let showToast = writable(false);
  let toastMessage = writable('');

  const menuItemsQuery = createQuery({ 
    queryKey: [GetMenuItems], 
    queryFn: async () => await cart.fetchMenuItems()      
  });
  const kioskoItemsQuery = createQuery({ 
    queryKey: [GetKioskoItems], 
    queryFn: async () => await cart.fetchKioskoItems()      
  });

  function handleStatusChange(id: mongoose.Types.ObjectId) {
    if (id) {
      if (order.status === 'ready') {
        orders.updateStatus(id);
        showToast.set(true); // Mostrar el toast cuando se actualiza el estado
        toastMessage.set(`Pedido ${order.id} entregado!`);
      } else {
        orders.updateStatus(id);
      }
    } else {
      console.error('Order ID is undefined');
    }
  }
  const closeToast = () => showToast.set(false);

</script>

<div class="bg-1 rounded-lg shadow-md p-6">
  <div class="flex justify-between items-start mb-4">
    <div>
      <h3 class="text-md md:text-lg font-semibold">Pedido #{order.id}</h3>
      <p class="text-xs md:text-sm text-gray-600">
        {new Date(order.createdAt).toLocaleString()}
      </p>
    </div>
    <span class={`px-3 py-1 rounded-full capitalize text-xs md:text-sm font-medium ${statusColors[order.status]}`}>
      {`${ order.status === 'completed' ? 'Completado' : translateStatusSpan(order.status)}!`}
    </span>
    <button class={`btn-change-status px-3 py-1 rounded-full capitalize text-xs md:text-sm font-medium ${statusColorsPlus[order.status]} ${order.status === 'completed' && 'hidden'}`} 
    on:click={()=> order._id && handleStatusChange(order._id)}
    disabled={order.status=='completed'}>
      { translateStatusBtn(statusPlus(order.status))}
    </button>
  </div>
  <div class="space-y-2 mb-4">
    {#if $menuItemsQuery.isSuccess && $kioskoItemsQuery.isSuccess}
      {#each order.items as item}
        {@const menuItem = getMenuItem(item.menuItemId, $menuItemsQuery.data) ?? getKioskoItem(item.menuItemId, $kioskoItemsQuery.data)}
        <div class="flex justify-between">
          <span class="text-md md:text-lg">{item.name} x {item.quantity}</span>
          <span class="text-md md:text-lg">${((menuItem?.price || 0) * item.quantity)?.toFixed(2)}</span>
        </div>
      {/each}
    {:else}
      <p>Cargando elementos del menú...</p>
    {/if}
  </div>
  {#if $showToast}
    <ToastComplete message={$toastMessage} onClose={closeToast} type='success' />
  {/if}
  <div class="border-t pt-4 flex justify-between items-center">
    <span class="font-semibold">Total:</span>
    <span class="font-semibold">${order.total?.toFixed(2) ?? 0}</span>
  </div>
</div>

<style>
  .ml-10 {
    margin: 0 20px;
  }
  .btn-change-status {
    border-radius: 3px;
  }
  .bg-1{
    background-image: radial-gradient(circle at 28% 29%, rgba(237, 237, 237,0.04) 0%, rgba(237, 237, 237,0.04) 50%,rgba(136, 136, 136,0.04) 50%, rgba(136, 136, 136,0.04) 100%),radial-gradient(circle at 8% 78%, rgba(156, 156, 156,0.04) 0%, rgba(156, 156, 156,0.04) 50%,rgba(37, 37, 37,0.04) 50%, rgba(37, 37, 37,0.04) 100%),radial-gradient(circle at 29% 46%, rgba(251, 251, 251,0.04) 0%, rgba(251, 251, 251,0.04) 50%,rgba(198, 198, 198,0.04) 50%, rgba(198, 198, 198,0.04) 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255));
  }
</style>
