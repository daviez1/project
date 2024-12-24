<script lang="ts">
  import Cart from '$lib/client/components/ordenar/Cart.svelte';
  import OrdenarPedido from '$lib/client/components/ordenar/OrdenarPedido.svelte';
</script>

<svelte:head>
  <title>Pedidos</title>
</svelte:head>

<div class="container mx-auto px-4 py-8 mt-10">
  <h1 class="text-4xl font-bold text-center mb-8">Ordenar aquí</h1>
  
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div class="lg:col-span-2">
      <OrdenarPedido />
    </div>
    <div>
      <Cart />
    </div>
  </div>
</div>