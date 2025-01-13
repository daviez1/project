<script lang="ts">
  import { translateStatusSpan } from '$lib/client/utils/translate';
  import { Order } from '$lib/common/models/order';
  import { orders } from '$lib/common/stores/orders';

  $: pendingOrders = $orders.filter(order => 
    order.status === 'pending' || order.status === 'preparing' || order.status === 'ready'
  );

</script>

<div class="bg-white mt-5 rounded-lg shadow-md p-6 mb-8">
  <h2 class="text-2xl font-bold mb-6">Estados de pedidos</h2>
  
  {#if pendingOrders.length === 0}
    <p class="text-center text-gray-500">Sin pedidos activos</p>
  {:else}
    <div class="space-y-4">
      {#each pendingOrders as order}
        <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <div>
            <span class="font-semibold">Pedido #{order.id}</span>
            <p class="text-sm text-gray-600">
              Estado: <span class="font-medium capitalize">{ translateStatusSpan(order.status) }</span>
            </p>
          </div>
          {#if order.status === 'ready'}
            <span class="text-green-600 font-medium animate-pulse">
              Listo para entrega!
            </span>
          {/if}
          {#if order.status === 'completed'}
            <span class="text-green-600 font-medium animate-pulse">
              Entregado!
            </span>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>