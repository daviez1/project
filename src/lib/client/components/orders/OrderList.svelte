<script lang="ts">
  import { orders } from '$lib/common/stores/orders';
  import { onMount } from 'svelte';
  import OrderCard from './OrderCard.svelte';
  import type { Order } from '$lib/types/order';
  import { createQuery } from '@tanstack/svelte-query';
  import { GetOrders } from '$lib/common/constants/queries';
  import Loader from '../form/Loader.svelte';

  // let ordersDB: Order[] = []

  const ordersQuery = createQuery({ 
  queryKey: [GetOrders], 
  queryFn: async () => await orders.fetchOrders()      
});

  // onMount(async()=>{
  //   ordersDB = await orders.fetchOrders()
  // })

</script>

<div class="space-y-6">
  <!-- {#if $ordersQuery.data.length === 0}
    <p class="text-center text-gray-500 py-8">Todavía no se han realizado pedidos</p>
  {:else} -->
    {#if $ordersQuery.isLoading}
      <Loader />
    {:else if $ordersQuery.isError}
      <p>Error: {$ordersQuery.error.message}</p>
    {:else if $ordersQuery.isSuccess}
      {#each $ordersQuery.data as order}
        <OrderCard {order} />
      {/each}
    {/if}
  <!-- {/if} -->
</div>