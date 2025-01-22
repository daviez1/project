<script lang="ts">
  import ButtonSeeOrders from '$lib/client/components/form/ButtonSeeOrders.svelte';
  import Cart from '$lib/client/components/ordenar/Cart.svelte';
  import OrdenarPedido from '$lib/client/components/ordenar/OrdenarPedido.svelte';
  import { cart } from '$lib/common/stores/cart';
  import { onMount } from 'svelte';

  let showSeeOrders = false;

  onMount(() => {
    const cartElement = document.getElementById('cart');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        showSeeOrders = !entry.isIntersecting;
      });
    });

    if (cartElement) {
      observer.observe(cartElement);
    }
  });
</script>

<svelte:head>
  <title>Menú-Pedidos</title>
</svelte:head>

<div class="container mx-auto px-4 py-8 mt-10">
  <h1 class="text-gradient text-2xl md:text-4xl font-bold text-center mb-8">Ordenar aquí</h1>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div class="lg:col-span-2">
      <OrdenarPedido />
    </div>
    <div class="h-fit" id="cart">
      <Cart />
    </div>
  </div>
  {#if $cart.length > 0}
    {#if showSeeOrders}
      <div class="fixed right-4 z-50 top-20">
        <ButtonSeeOrders />
      </div>
    {/if}
  {/if}
</div>