<script lang="ts">
  import { translateStatusSpan } from '$lib/client/utils/translate';
  import { Order } from '$lib/common/models/order';
  import { orders } from '$lib/common/stores/orders';
  import { writable, get } from 'svelte/store';
  import Pagination from '$lib/client/components/form/Pagination.svelte';
  import { afterUpdate } from 'svelte';

  const itemsPerPage = 10;
  let currentPage = 1;
  let paginatedOrders = writable<Order[]>([]);

  function paginate() {
    if ($orders.length > 0) {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      paginatedOrders.set($orders.slice(start, end));
    }
  }

  afterUpdate(() => paginate());

  function handlePageChange(event: any) {
    currentPage = event.detail;
    paginate();
  }
</script>

<div class="bg mt-5 rounded-lg shadow-md p-6 mb-8">
  <h2 class="text-2xl font-bold mb-6 text-center">Historial de pedidos</h2>
  
  {#if $paginatedOrders.length === 0}
    <p class="text-center text-gray-500">Sin pedidos activos</p>
  {:else}
    <div class="space-y-4">
      {#each $paginatedOrders as order}
        <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg bg1">
          <div>
            <span class="font-semibold">Pedido #{order.id}</span>
            <p class="text-sm text-gray-600">
              Estado: <span class="font-medium capitalize">{ translateStatusSpan(order.status) }</span>
            </p>
            <p class="text-sm text-gray-600">
              Fecha: <span class="font-medium capitalize">{ String(order.createdAt).substring(0, 10) }</span>
            </p>
          </div>
          {#if order.status === 'pending'}
          <span class="text-red-600 text-xs w-2/5 md:w-4/5 md:text-sm md:mr-8 animate-pulse text-right">El pedido está pendiente!</span>
          {:else if order.status === 'preparing'}  
          <span class="text-red-600 text-xs w-2/5 md:w-4/5 md:text-sm md:mr-8 animate-pulse text-right">El pedido está cocinándose!</span>
          {:else if order.status === 'ready'}  
            <span class="text-gray-600 text-xs w-2/5 md:w-4/5 md:text-sm md:mr-8 animate-pulse text-right">Listo para entrega!</span>
          {:else if order.status === 'completed'}  
            <span class="text-red-600 text-xs w-2/5 md:w-4/5 md:text-sm md:mr-8 animate-pulse text-right">El pedido ha sido entregado!</span>
          {/if}
        </div>
      {/each}
    </div>
  {/if}

  <Pagination {currentPage} {itemsPerPage} totalItems={$orders.length} on:pageChange={handlePageChange} />
</div>

<style>
  .bg{
    background-image: linear-gradient(340deg, rgba(76, 76, 76,0.02) 0%, rgba(76, 76, 76,0.02) 34%,transparent 34%, transparent 67%,rgba(142, 142, 142,0.02) 67%, rgba(142, 142, 142,0.02) 73%,rgba(151, 151, 151,0.02) 73%, rgba(151, 151, 151,0.02) 100%),linear-gradient(320deg, rgba(145, 145, 145,0.02) 0%, rgba(145, 145, 145,0.02) 10%,transparent 10%, transparent 72%,rgba(35, 35, 35,0.02) 72%, rgba(35, 35, 35,0.02) 76%,rgba(69, 69, 69,0.02) 76%, rgba(69, 69, 69,0.02) 100%),linear-gradient(268deg, rgba(128, 128, 128,0.02) 0%, rgba(128, 128, 128,0.02) 5%,transparent 5%, transparent 76%,rgba(78, 78, 78,0.02) 76%, rgba(78, 78, 78,0.02) 83%,rgba(224, 224, 224,0.02) 83%, rgba(224, 224, 224,0.02) 100%),linear-gradient(198deg, rgba(25, 25, 25,0.02) 0%, rgba(25, 25, 25,0.02) 36%,transparent 36%, transparent 85%,rgba(180, 180, 180,0.02) 85%, rgba(180, 180, 180,0.02) 99%,rgba(123, 123, 123,0.02) 99%, rgba(123, 123, 123,0.02) 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255));
  }
  .bg1{
    background-image: radial-gradient(circle at 28% 29%, rgba(237, 237, 237,0.04) 0%, rgba(237, 237, 237,0.04) 50%,rgba(136, 136, 136,0.04) 50%, rgba(136, 136, 136,0.04) 100%),radial-gradient(circle at 8% 78%, rgba(156, 156, 156,0.04) 0%, rgba(156, 156, 156,0.04) 50%,rgba(37, 37, 37,0.04) 50%, rgba(37, 37, 37,0.04) 100%),radial-gradient(circle at 29% 46%, rgba(251, 251, 251,0.04) 0%, rgba(251, 251, 251,0.04) 50%,rgba(198, 198, 198,0.04) 50%, rgba(198, 198, 198,0.04) 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255));
  }
</style>