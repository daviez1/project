<script lang="ts">
  import { orders } from '$lib/common/stores/orders';
  import OrderCard from './OrderCard.svelte';
  import { createQuery } from '@tanstack/svelte-query';
  import { GetOrders } from '$lib/common/constants/queries';
  import Loader from '../form/Loader.svelte';

  // let ordersDB: Order[] = []

  const ordersQuery = createQuery({ 
    queryKey: [GetOrders], 
    queryFn: async () => await orders.fetchOrders()      
  });

</script>

<div class="space-y-6">
    {#if $ordersQuery.isLoading}
      <Loader />
    {:else if $ordersQuery.isError}
      <p>Error: {$ordersQuery.error.message}</p>
    {:else if $ordersQuery.isSuccess}
      {#each $orders as order}
        <OrderCard {order} />
      {/each}
    {/if}
</div>