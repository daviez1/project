<script lang="ts">
  import type { MenuItem } from '$lib/types/menu';
  import { afterUpdate, onMount } from 'svelte';
  import DishCard from '../menu/DishCard.svelte';
  import { cart } from '$lib/common/stores/cart';
  import Cart from '../ordenar/Cart.svelte';
  import ButtonSeeOrders from '../form/ButtonSeeOrders.svelte';
  import { createQuery } from '@tanstack/svelte-query';
  import { GetMenuItems } from '$lib/common/constants/queries';
  import Loader from '../form/Loader.svelte';
  import Empty from '../form/Empty.svelte';

  let showSeeOrders = true;
  let direction = 'down';
  
  let paginateMenu: MenuItem[] = [];
  const menuItemsQuery = createQuery({
    queryKey: [GetMenuItems],
    queryFn: async () => await cart.fetchMenuItems(),
  });
  
  afterUpdate(() =>{
    updatePaginateMenu();
  })

  onMount(() => {    
    // Configurar un timeout para que el intervalo comience después de 10 segundos
    setInterval(()=> updatePaginateMenu, 10000)
    
    setInterval(()=> updatePaginateMenu(), 6000)

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

  const updatePaginateMenu = () => {
    const data = $menuItemsQuery.data;
    if (data) {
      const start = Math.floor(Math.random() * (data.length - 2));
      paginateMenu = data.slice(start, start + 3);
    }
  };
  
</script>

<section>
  <div class="container mb-8 mx-auto p-4 rounded shadow-lg">
    <h2 class="text-3xl font-bold text-center mb-12 leading-8 font-extrabold tracking-tight text-gray-700 sm:text-4xl">Algunos de nuestros platos</h2>
    <div>
      {#if $menuItemsQuery.isLoading}
       <Loader />
      {:else if $menuItemsQuery.isError}
        <p>Error: {$menuItemsQuery.error.message}</p>
      {:else if $menuItemsQuery.isSuccess}
        {#if $menuItemsQuery.data.length > 0}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each paginateMenu as item (item.id)}
            <DishCard {item}/>
            {/each}
          </div>  
        {:else}
          <div class="container mx-auto px-4 py-8">
            <Empty /> 
          </div>        
        {/if}
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
