<script lang="ts">
  import type { MenuItem } from '$lib/types/menu';
  import { onMount } from 'svelte';
  import DishCard from '../menu/DishCard.svelte';
  import { cart } from '$lib/common/stores/cart';
  import Cart from '../ordenar/Cart.svelte';
  import ButtonSeeOrders from '../form/ButtonSeeOrders.svelte';
  import { createQuery } from '@tanstack/svelte-query';
  import { GetMenuItems } from '$lib/common/constants/queries';
  import Loader from '../form/Loader.svelte';

  let showSeeOrders = true;
  let direction = 'down';

  const menuItemsQuery = createQuery({
    queryKey: [GetMenuItems],
    queryFn: async()=> await cart.fetchMenuItems(),
  });


//   import { createQuery } from '@tanstack/svelte-query'

//   const endpoint = 'http://localhost:5173/api/data'

//   let intervalMs = 1000

//   const query = createQuery({
//     queryKey: ['refetch'],
//     queryFn: async () => await fetch(endpoint).then((r) => r.json()),
//     refetchInterval: intervalMs,
//   })
// <input type="number" bind:value={intervalMs} />


  onMount(async () => {
    // setInterval(async () => {
    //   let inicio = 0, fin = 2;
    //   $menuItemsQuery.data.slice(inicio, fin);
    //   inicio += 3; fin += 2;
    // }, 3000);

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

<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12">Algunos de nuestros platos</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#if $menuItemsQuery.isLoading}
        <Loader />
      {:else if $menuItemsQuery.isError}
        <p>Error: {$menuItemsQuery.error.message}</p>
      {:else if $menuItemsQuery.isSuccess}
        {#each $menuItemsQuery.data as item}
          <DishCard {item} />
        {/each}
      {/if}
    </div>
  </div>
  {#if $cart.length > 0}
    {#if showSeeOrders}
      <div class="fixed top-20 right-4 z-50">
        <ButtonSeeOrders {direction} />
      </div>
    {/if}
    <div id="cart">
      <Cart />
    </div>
  {/if}
</section>
