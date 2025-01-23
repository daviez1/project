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

<div class="space-y-8 bg rounded-lg shadow-md p-6">
  <h2 class="text-2xl md:text-3xl font-bold mb-4 text-center text-gradient">Menú</h2>
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
              <summary class="text-lg md:text-2xl font-bold mb-0 cursor-pointer bg-1 p-1 md:p-2 hover:bg-gray-200">
                <span class='text-gray-600 text-md md:text-lg'>{category.name}</span>
                <span class="text-gray-600 view-more pointer text-sm md:text-md">Ver Más</span>
              </summary>
              <div class="grid gap-6 justify-items-center p-4 bg-1">
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
    margin-top: .5em !important;
  }
  .bg{
    background-image: radial-gradient(circle at 13% 47%, rgba(140, 140, 140,0.03) 0%, rgba(140, 140, 140,0.03) 25%,transparent 25%, transparent 100%),radial-gradient(circle at 28% 63%, rgba(143, 143, 143,0.03) 0%, rgba(143, 143, 143,0.03) 16%,transparent 16%, transparent 100%),radial-gradient(circle at 81% 56%, rgba(65, 65, 65,0.03) 0%, rgba(65, 65, 65,0.03) 12%,transparent 12%, transparent 100%),radial-gradient(circle at 26% 48%, rgba(60, 60, 60,0.03) 0%, rgba(60, 60, 60,0.03) 6%,transparent 6%, transparent 100%),radial-gradient(circle at 97% 17%, rgba(150, 150, 150,0.03) 0%, rgba(150, 150, 150,0.03) 56%,transparent 56%, transparent 100%),radial-gradient(circle at 50% 100%, rgba(25, 25, 25,0.03) 0%, rgba(25, 25, 25,0.03) 36%,transparent 36%, transparent 100%),radial-gradient(circle at 55% 52%, rgba(69, 69, 69,0.03) 0%, rgba(69, 69, 69,0.03) 6%,transparent 6%, transparent 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255));
  }
  .bg-1{
    background-image: repeating-linear-gradient(148deg, hsla(54,0%,87%,0.12) 0px, hsla(54,0%,87%,0.12) 1px,transparent 1px, transparent 4px,hsla(54,0%,87%,0.12) 4px, hsla(54,0%,87%,0.12) 5px,transparent 5px, transparent 7px,hsla(54,0%,87%,0.12) 7px, hsla(54,0%,87%,0.12) 8px),repeating-linear-gradient(119deg, hsla(54,0%,87%,0.12) 0px, hsla(54,0%,87%,0.12) 1px,transparent 1px, transparent 4px,hsla(54,0%,87%,0.12) 4px, hsla(54,0%,87%,0.12) 5px,transparent 5px, transparent 7px,hsla(54,0%,87%,0.12) 7px, hsla(54,0%,87%,0.12) 8px),repeating-linear-gradient(0deg, hsla(54,0%,87%,0.15) 0px, hsla(54,0%,87%,0.15) 0px,transparent 0px, transparent 1px,hsla(54,0%,87%,0.15) 1px, hsla(54,0%,87%,0.15) 4px,transparent 4px, transparent 5px,hsla(54,0%,87%,0.15) 5px, hsla(54,0%,87%,0.15) 8px),repeating-linear-gradient(90deg, hsla(54,0%,87%,0.15) 0px, hsla(54,0%,87%,0.15) 0px,transparent 0px, transparent 1px,hsla(54,0%,87%,0.15) 1px, hsla(54,0%,87%,0.15) 4px,transparent 4px, transparent 5px,hsla(54,0%,87%,0.15) 5px, hsla(54,0%,87%,0.15) 8px),linear-gradient(90deg, rgb(251,251,251),rgb(251,251,251));
  }
</style>