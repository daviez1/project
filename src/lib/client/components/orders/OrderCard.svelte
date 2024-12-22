<script lang="ts">
  import type { Order } from '$lib/types/order';
  import { getMenuItem } from '$lib/common/data/menu';
  import { getKioskoItem } from '$lib/common/data/kiosko';
  import { updateOrderStatus } from '$lib/utils/orders';
  import { translateStatus } from '$lib/client/utils/translate';
  import { statusPlus } from '$lib/client/utils/statusPlus';
  import Toast from '../notifications/Toast.svelte';
  import { orders } from '$lib/common/stores/orders';
  import { onMount } from 'svelte';

  export let order: Order;
  let showToast = false

  const statusColors: { pending:string, preparing:string, ready:string, completed:string } = {
    pending: 'bg-yellow-100 text-yellow-800',
    preparing: 'bg-blue-100 text-blue-800',
    ready: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800'
  };
  const statusColorsPlus: { pending:string, preparing:string, ready:string, completed:string } = {
    pending: 'bg-blue-100 text-blue-800',
    preparing: 'bg-green-100 text-green-800',
    ready: 'bg-gray-100 text-gray-800',
    completed: 'bg-yellow-100 text-gray-800',
  };

  function handleStatusChange() {
    if (order.status == 'completed') {
      showToast = true;
    } else {
      const newStatus = statusPlus(order.status);
      orders.updateStatus(order.id, newStatus);
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
      {order.status === 'completed' ? 'Entregado!' : `${translateStatus(order.status)}!` }
    </span>
    <button class={`btn-change-status px-3 py-1 rounded-full capitalize text-sm font-medium ${statusColorsPlus[order.status]}`} 
    on:click={handleStatusChange}
    disabled={order.status=='completed'}>
      {translateStatus(statusPlus(order.status))}
    </button>
  </div>
  
  <div class="space-y-2 mb-4">

    {#each order.items as item}
      {@const menuItem = getMenuItem(item.menuItemId) ?? getKioskoItem(item.menuItemId)}
      <div class="flex justify-between">
        <span>{item.name} x {item.quantity}</span>
        <span>${((menuItem?.price || 0) * item.quantity).toFixed(2)}</span>
      </div>
    {/each}

  </div>
  {#if order.status == 'completed'}
  <Toast message='Pedido entregado' onClose={closeToast} />
  {/if}
  <div class="border-t pt-4 flex justify-between items-center">
    <span class="font-semibold">Total:</span>
    <span class="font-semibold">${order.total.toFixed(2)}</span>
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
