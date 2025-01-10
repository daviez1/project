<script lang="ts">
  import { cart } from '$lib/common/stores/cart';
  import { createQuery } from '@tanstack/svelte-query';
  import Loader from '../form/Loader.svelte';
  import { GetCategoryItems } from '$lib/common/constants/queries';
  import '../menu/Menu_Kiosko.css';
  import Empty from '../form/Empty.svelte';
  import DishCardInSection from '../menu/DishCardInSection.svelte';

  const menuCategoryQuery = createQuery({
    queryKey: [GetCategoryItems],
    queryFn: async () => await cart.fetchMenuCategories(),
  });
</script>

<div class="space-y-8 bg-gray-100 rounded-lg shadow-md p-6">
  <h2 class="text-3xl font-bold mb-4 text-center">Menú</h2>
  {#if $menuCategoryQuery.isLoading}
    <Loader />
  {:else if $menuCategoryQuery.isError}
    <p class="text-red">Error: {$menuCategoryQuery.error.message}</p>
  {:else if $menuCategoryQuery.isSuccess}
    {#if $menuCategoryQuery.data.length > 0}      
      {#each $menuCategoryQuery.data as category}
        {#if category.items.length > 0}      
          <section>
            <details class="border rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
              <summary class="text-2xl font-bold mb-0 cursor-pointer bg-gray-200 p-2 hover:bg-gray-200">
                <span class='text-gray-600'>{category.name}</span>
                <span class="view-more">Ver Más</span>
              </summary>
              <div class="grid gap-6 justify-items-center p-4 bg-gray-100/100">
                {#each category.items as item}
                <DishCardInSection {item} />
                {/each}
              </div>
            </details>
          </section>
        {/if} 
      {/each}
    {:else}
      <Empty />  
    {/if}
  {/if}
</div>

<style>
  section{
    margin-top: 1em !important;
  }
</style>