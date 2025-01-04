<script lang="ts">
  import { cart } from '$lib/common/stores/cart';
  import { onMount } from 'svelte';
  import DishCard from '../menu/DishCard.svelte';
  import { MenuCategory } from '$lib/common/models/menu';
  import { createQuery } from '@tanstack/svelte-query';
  import Loader from '../form/Loader.svelte';
  import { GetCategoryItems } from '$lib/common/constants/queries';
  import '../menu/Menu_Kiosko.css'
  import { capitalize } from '$lib/client/utils/capitalize';

  const menuCategoryQuery = createQuery({
    queryKey: [GetCategoryItems],
    queryFn: async () => await cart.fetchMenuCategories(),
  });
</script>

<div class="space-y-8 bg-white rounded-lg shadow-md p-6">
  <h2 class="text-3xl font-bold mb-4 text-center">Menú</h2>
  {#if $menuCategoryQuery.isLoading}
    <Loader />
  {:else if $menuCategoryQuery.isError}
    <p class="text-red">Error: {$menuCategoryQuery.error.message}</p>
  {:else if $menuCategoryQuery.isSuccess}
    {#each $menuCategoryQuery.data as category}
      {#if category.items.length > 0}      
        <section>
          <details class="border rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
            <summary class="text-2xl font-bold mb-0 cursor-pointer bg-gray-100 p-4 hover:bg-gray-200">
              <span class='text-gray-600'>{category.name}</span>
              <span class="view-more">Ver Más</span>
            </summary>
            <div class="grid grid-cols-1 gap-6 justify-items-center p-4 bg-white">
              {#each category.items as item}
                <DishCard {item} />
              {/each}
            </div>
          </details>
        </section>
      {/if} 
    {/each}
  {/if}
</div>