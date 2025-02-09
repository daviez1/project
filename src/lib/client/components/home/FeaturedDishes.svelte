<script lang="ts">
  import type { MenuItem } from '$lib/types/menu';
  import { afterUpdate, onMount } from 'svelte';
  import DishCard from '../menu/DishCard.svelte';
  import { cart } from '$lib/common/stores/cart';
  import { createQuery } from '@tanstack/svelte-query';
  import { GetMenuItems } from '$lib/common/constants/queries';
  import Loader from '../form/Loader.svelte';
  import Empty from '../form/Empty.svelte';

  let showSeeOrders = true;
  let direction = 'down';
  
  let paginateMenu: MenuItem[] = [];
  let currentIndex = 0; 
  const menuItemsQuery = createQuery({
    queryKey: [GetMenuItems],
    queryFn: async () => {
      let items: MenuItem[] = await cart.fetchMenuItems();
      return items.filter(item => item.category === 'platos fuertes');
    },
  });
  
  afterUpdate(() => {
    updatePaginateMenu();
  });

  onMount(() => {    
    setInterval(() => updatePaginateMenu(), 10000);

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
      paginateMenu = [data[currentIndex]];
      currentIndex = (currentIndex + 1) % data.length; 
    }
  };
</script>

<section>
  <div class="mx-0 md:mx-8 rounded mt-8">
    <div>
      {#if $menuItemsQuery.isLoading}
      <Loader />
      {:else if $menuItemsQuery.isError}
      <p>Error: {$menuItemsQuery.error.message}</p>
      {:else if $menuItemsQuery.isSuccess}
      {#if $menuItemsQuery.data.length > 0}
      <div class="grid grid-cols-1 h-fit w-full justify-center items-center">
            <h2 class="text-2xl md:text-3xl text-center leading-8 font-extrabold tracking-tight mt-2 mb-8 text-gray-700 sm:text-4xl">Algunos de nuestros platos</h2>
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
</section>
