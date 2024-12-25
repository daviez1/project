<script lang="ts">
  import KioskoCategory from '$lib/client/components/kiosko/KioskoCategory.svelte';
  import * as KioskoCategoryTypes from '$lib/types/kiosko';
  import Cart from '$lib/client/components/ordenar/Cart.svelte';
  import { onMount } from 'svelte';
  import { cart } from '$lib/common/stores/cart';
  import ButtonSeeOrders from '$lib/client/components/form/ButtonSeeOrders.svelte';

  export let direction = 'down';
  let kioskoCategories: KioskoCategoryTypes.KioskoCategory[] = [];
  let showSeeOrders = false;

  onMount(async () => {
    kioskoCategories = await cart.fetchKioskoCategories();
    const cartElement = document.getElementById('cart');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          showSeeOrders = false;
        } else {
          showSeeOrders = true;
        }
      });
    });

    if (cartElement) {
      observer.observe(cartElement);
    }
  });
</script>

<svelte:head>
  <title>Kiosko - Galletas & Más</title>
</svelte:head>

<div class="container mx-auto px-4 py-8 mt-10">
  <h1 class="text-4xl font-bold text-center mb-8">Kiosko</h1>
  <p class="text-center text-gray-600 mb-12">Encuentra comida rápida y picadera</p>
  <div class="space-y-12">
    {#each kioskoCategories as category}
      <KioskoCategory {category} />
    {/each}
  </div>
  {#if $cart.length > 0}
    <div id="cart">
      <Cart />
    </div>
    {#if showSeeOrders}
      <div class="fixed top-20 right-4 z-50">
        <ButtonSeeOrders {direction} />
      </div>
    {/if}
  {/if}
</div>
