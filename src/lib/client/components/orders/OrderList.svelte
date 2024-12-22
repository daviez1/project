<script lang="ts">
  import { orders } from '$lib/common/stores/orders';
  import { onMount } from 'svelte';
  import OrderCard from './OrderCard.svelte';
  import type { Order } from '$lib/types/order';

  let ordersDB: Order[] = []

  onMount(async()=>{
    ordersDB = await orders.getOrder()
  })

</script>

<div class="space-y-6">
  {#if ordersDB.length === 0}
    <p class="text-center text-gray-500 py-8">Todavía no se han realizado pedidos</p>
  {:else}
    {#each ordersDB as order}
      <OrderCard {order} />
    {/each}
  {/if}
</div>