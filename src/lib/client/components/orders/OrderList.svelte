<script lang="ts">
  import { orders } from '$lib/common/stores/orders';
  import OrderCard from './OrderCard.svelte';
  import { createQuery } from '@tanstack/svelte-query';
  import { GetOrders } from '$lib/common/constants/queries';
  import Loader from '../form/Loader.svelte';
  import { writable, get } from 'svelte/store';
  import type { Order } from '$lib/types/order';
  import Pagination from '$lib/client/components/form/Pagination.svelte';
  import { afterUpdate } from 'svelte';

  const itemsPerPage = 5;
  let currentPage = 1;
  let paginatedOrders = writable<Order[]>([]);

  $: ordersQuery = createQuery({ 
    queryKey: [GetOrders], 
    queryFn: async () => await orders.fetchOrders()      
  });

  $: pendingOrders = $orders.filter(order => 
  order.status === 'pending' || order.status === 'preparing' || order.status === 'ready'
);
  
  function paginate() {
    if ($orders.length > 0) {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      paginatedOrders.set($orders.slice(start, end));
    }
  }

  afterUpdate(() => paginate());

  function handlePageChange(event:any) {
    currentPage = event.detail;
    paginate();
  }

  $: paginate();
  
</script>

<div class="bg-white mt-5 rounded-lg shadow-md p-6 mb-8">
  <h2 class="text-2xl font-bold mb-6">Lista de Pedidos</h2>
  
  {#if $ordersQuery.isLoading}
    <Loader />
  {:else if $ordersQuery.isError}
    <p>Error: {$ordersQuery.error.message}</p>
  {:else if $ordersQuery.isSuccess}
    {#if $paginatedOrders.length === 0}
      <p class="text-center text-gray-500">Sin pedidos activos</p>
    {:else}
      <div class="space-y-4">
        {#each $paginatedOrders as order (order.id)}
          <OrderCard {order} />
        {/each}
      </div>
    {/if}

    <Pagination {currentPage} {itemsPerPage} totalItems={$orders.length} on:pageChange={handlePageChange} />
  {/if}
</div>