<script lang="ts">
  import { cart } from '$lib/common/stores/cart';
  import { onMount } from 'svelte';
  import DishCard from '../menu/DishCard.svelte';
  import { MenuCategory } from '$lib/common/models/menu';

  let menuCategory: MenuCategory[] = [];

  onMount(async () => {
    menuCategory = await cart.fetchMenuCategories();
  });
</script>

<div class="space-y-8 bg-white rounded-lg shadow-md p-6">
  <h2 class="text-3xl font-bold mb-4 text-center">Menú</h2>
  {#each menuCategory as category}
    {#if category.items.length > 0}      
      <section>
        <details class="rounded-lg overflow-hidden">
          <summary class="text-2xl font-bold mb-0 cursor-pointer bg-gray-100 p-4 hover:bg-gray-200">
            <span>{category.name}</span>
            <svg class="w-[30px] h-[30px] text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 20V7m0 13-4-4m4 4 4-4m4-12v13m0-13 4 4m-4-4-4 4"/>
            </svg>            
          </summary>
          <div class="grid grid-cols-1 md:grid-cols-1 gap-6 justify-items-center p-4 bg-white">
            {#each category.items as item}
              <DishCard {item} />
            {/each}
          </div>
        </details>
      </section>
    {/if} 
  {/each}
</div>

<style>
  summary {
    list-style: none; /* Quita el triángulo negro */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  summary::marker {
    display: none; /* Asegura que el marcador no se muestre */
  }

  .view-more {
    font-size: 1rem;
    color: #3182ce;
    cursor: pointer;
    text-decoration: none;
  }

  summary:hover .view-more {
    font-size: 1.2rem;
    transition: ease .5s;
  }
</style>
