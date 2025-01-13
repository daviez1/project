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

  export let order: Order;
  let showToast = false;

  const menuItemsQuery = createQuery({ 
    queryKey: [GetMenuItems], 
    queryFn: async () => await cart.fetchMenuItems()      
  });
  const kioskoItemsQuery = createQuery({ 
    queryKey: [GetKioskoItems], 
    queryFn: async () => await cart.fetchKioskoItems()      
  });

  $: menuItems = $menuItemsQuery.data || [];
  $: kioskoItems = $kioskoItemsQuery.data || [];

  const statusColors: { pending: string, preparing: string, ready: string, completed: string } = {
    pending: 'bg-yellow-100 text-yellow-800',
    preparing: 'bg-blue-100 text-blue-800',
    ready: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800'
  };
  const statusColorsPlus: { pending: string, preparing: string, ready: string, completed: string } = {
    pending: 'bg-blue-100 text-blue-800',
    preparing: 'bg-green-100 text-green-800',
    ready: 'bg-gray-100 text-gray-800',
    completed: 'bg-yellow-100 text-gray-800',
  };

  function handleStatusChange(id: mongoose.Types.ObjectId) {
    if (id) {
      orders.updateStatus(id);
      showToast = true; // Mostrar el toast cuando se actualiza el estado
    } else {
      console.error('Order ID is undefined');
    }
  }

  function closeToast() {
    showToast = false;
  }
</script>

<div class="bg-white rounded-lg shadow-md p-6">
  <div class="flex justify-between items-start mb-4">
    <div>
      <h3 class="text-lg font-semibold">Pedido #{order.id}</h3>
      <p class="text-sm text-gray-600">
        {new Date(order.createdAt).toLocaleString()}
      </p>
    </div>
    <span class={`px-3 py-1 rounded-full capitalize text-sm font-medium ${statusColors[order.status]}`}>
      {`${ order.status === 'completed' ? 'Completado' : translateStatusSpan(order.status)}!`}
    </span>
    <button class={`btn-change-status px-3 py-1 rounded-full capitalize text-sm font-medium ${statusColorsPlus[order.status]} ${order.status === 'completed' && 'hidden'}`} 
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
          <span>{item.name} x {item.quantity}</span>
          <span>${((menuItem?.price || 0) * item.quantity)?.toFixed(2)}</span>
        </div>
      {/each}
    {:else}
      <p>Cargando elementos del menú...</p>
    {/if}
  </div>
  {#if showToast && order.status == 'completed'}
    <ToastComplete message='Pedido entregado' onClose={closeToast} type='success' duration={3000} />
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
</style>
