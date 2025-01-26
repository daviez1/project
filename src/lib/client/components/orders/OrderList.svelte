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
  
  function paginate() {
    if ($orders.length > 0) {      
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      paginatedOrders.set($orders
      // .filter(order => 
      // order.status === 'pending' || order.status === 'preparing' || order.status === 'ready')
      .slice(start, end));
    }
  }

  afterUpdate(() => paginate());

  function handlePageChange(event:any) {
    currentPage = event.detail;
    paginate();
  }

  $: paginate();
  
</script>

<div class="bg mt-5 rounded-lg shadow-md p-6 mb-8">
  <h2 class="text-2xl md:text-3xl text-center font-bold mb-6 text-gradient">Lista de Pedidos</h2>
  
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

    <Pagination {currentPage} {itemsPerPage} totalItems={$paginatedOrders.length} on:pageChange={handlePageChange} />
  {/if}
</div>

<style>
  .bg{
    background-image: linear-gradient(340deg, rgba(76, 76, 76,0.02) 0%, rgba(76, 76, 76,0.02) 34%,transparent 34%, transparent 67%,rgba(142, 142, 142,0.02) 67%, rgba(142, 142, 142,0.02) 73%,rgba(151, 151, 151,0.02) 73%, rgba(151, 151, 151,0.02) 100%),linear-gradient(320deg, rgba(145, 145, 145,0.02) 0%, rgba(145, 145, 145,0.02) 10%,transparent 10%, transparent 72%,rgba(35, 35, 35,0.02) 72%, rgba(35, 35, 35,0.02) 76%,rgba(69, 69, 69,0.02) 76%, rgba(69, 69, 69,0.02) 100%),linear-gradient(268deg, rgba(128, 128, 128,0.02) 0%, rgba(128, 128, 128,0.02) 5%,transparent 5%, transparent 76%,rgba(78, 78, 78,0.02) 76%, rgba(78, 78, 78,0.02) 83%,rgba(224, 224, 224,0.02) 83%, rgba(224, 224, 224,0.02) 100%),linear-gradient(198deg, rgba(25, 25, 25,0.02) 0%, rgba(25, 25, 25,0.02) 36%,transparent 36%, transparent 85%,rgba(180, 180, 180,0.02) 85%, rgba(180, 180, 180,0.02) 99%,rgba(123, 123, 123,0.02) 99%, rgba(123, 123, 123,0.02) 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255));
  }
</style>