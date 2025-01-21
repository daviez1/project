<script lang="ts">
  import KioskoCategory from '$lib/client/components/kiosko/KioskoCategory.svelte';
  import * as KioskoCategoryTypes from '$lib/types/kiosko';
  import Cart from '$lib/client/components/ordenar/Cart.svelte';
  import { onMount } from 'svelte';
  import { cart } from '$lib/common/stores/cart';
  import ButtonSeeOrders from '$lib/client/components/form/ButtonSeeOrders.svelte';
  import Loader from '$lib/client/components/form/Loader.svelte';
  import { createQuery } from '@tanstack/svelte-query';
  import { GetKioskoCategoryItems } from '$lib/common/constants/queries';
  import '$lib/client/components/menu/Menu_Kiosko.css'
  import Empty from '$lib/client/components/form/Empty.svelte';

  const kioskoCategoryQuery = createQuery({
    queryKey: [GetKioskoCategoryItems],
    queryFn: async () => await cart.fetchKioskoCategories(),
  });

  let showSeeOrders = false;

  onMount(async () => {
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

<div class="bg-fixed">
  <div class="container mx-auto px-4 py-8 mt-10">
    <div class="p-05 bg-stone-950/75 w-fit m-auto pt-2 px-4 rounded">
      <h1 class="txt-gradient text-4xl font-bold text-center mb-2">Kiosko</h1>
      <p class="text-center text-gray-200 rounded mb-8">Encuentra comida rápida y picadera</p>
    </div>
    <div class="space-y-12">
      {#if $kioskoCategoryQuery.isLoading}
      <Loader />
    {:else if $kioskoCategoryQuery.isError}
      <p>Error: {$kioskoCategoryQuery.error.message}</p>
    {:else if $kioskoCategoryQuery.isSuccess}
      {#if $kioskoCategoryQuery.data.length > 0}
        {#each $kioskoCategoryQuery.data as category}
          <KioskoCategory {category} />
        {/each}
        <!-- {#if $cart.length > 0} -->
          <div id="cart" class={$cart.length > 0 ? 'flex' : 'invisible'}>
            <Cart />
          </div>
            {#if showSeeOrders}
            <div class="fixed top-20 right-4 z-50">
              <ButtonSeeOrders />
            </div>
            {/if}
        <!-- {/if} -->
      {:else}
      <Empty /> 
      {/if}
      {/if}      
    </div>
  </div>
</div>

<style>
  /* .p-05{
    padding-bottom: 0 !important ;
  } */
  .bg-fixed {
    background-image: url('../../lib/client/assets/coca-cola.jpg');
    background-attachment: fixed;
    background-size: cover;
  }

  @media (min-width: 768px) {
    .bg-fixed {
      background-image: url('../../lib/client/assets/coca-cola-5779718_1920.jpg');
    }
  }
  div>p{
    padding-bottom: .5em;
  }

  .txt-gradient {
    background: linear-gradient(to right, #ffffff 0%, #ff6fff 100%);
    background-clip: text;
    color: transparent;
  }
</style>
