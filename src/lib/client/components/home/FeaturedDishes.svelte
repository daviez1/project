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
  import { fade, fly } from 'svelte/transition';

  let showSeeOrders = true;
  let direction = 'down';
  const menuItemsQuery = createQuery({
    queryKey: [GetMenuItems],
    queryFn: async () => await cart.fetchMenuItems(),
  });

  let paginateMenu: MenuItem[] = [];

  onMount(() => {
    const updatePaginateMenu = () => {
      const data = $menuItemsQuery.data;
      if (data) {
        const start = Math.floor(Math.random() * (data.length - 3));
        paginateMenu = data.slice(start, start + 3);
      }
    };

    updatePaginateMenu();
    const interval = setInterval(updatePaginateMenu, 10000);

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

    return () => clearInterval(interval);
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
        {#each paginateMenu as item (item.id)}
          <DishCard {item}/>
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
