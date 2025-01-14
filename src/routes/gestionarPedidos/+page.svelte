<script lang="ts">
  import OrderList from '$lib/client/components/orders/OrderList.svelte';
  import OrderHistory from '$lib/client/components/orders/OrderHistory.svelte';
</script>

<svelte:head>
  <title>Gestión de Pedidos</title>
</svelte:head>

<div class="container mx-auto px-4 py-8 mt-10">
  <h1 class="text-4xl font-bold text-center mb-8">Gestión de Pedidos</h1>
  <OrderList />
  <OrderHistory />
</div>