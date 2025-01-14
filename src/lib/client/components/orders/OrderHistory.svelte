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

<div class="bg-white mt-5 rounded-lg shadow-md p-6 mb-8">
  <h2 class="text-2xl font-bold mb-6">Historial de pedidos</h2>
  
  {#if $paginatedOrders.length === 0}
    <p class="text-center text-gray-500">Sin pedidos activos</p>
  {:else}
    <div class="space-y-4">
      {#each $paginatedOrders as order}
        <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <div>
            <span class="font-semibold">Pedido #{order.id}</span>
            <p class="text-sm text-gray-600">
              Estado: <span class="font-medium capitalize">{ translateStatusSpan(order.status) }</span>
            </p>
            <p class="text-sm text-gray-600">
              Fecha: <span class="font-medium capitalize">{ String(order.createdAt).substring(0, 10) }</span>
            </p>
          </div>
          {#if order.status === 'ready'}
            <span class="text-gray-600 font-medium animate-pulse sm:font-normal">Listo para entrega!</span>
          {:else if order.status === 'pending'}  
            <span class="text-red-600 font-medium animate-pulse">El pedido está pendiente!</span>
          {/if}
        </div>
      {/each}
    </div>
  {/if}

  <Pagination {currentPage} {itemsPerPage} totalItems={$orders.length} on:pageChange={handlePageChange} />
</div>