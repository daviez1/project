<script lang="ts">
  import { cart } from '$lib/common/stores/cart';
  import { onMount } from 'svelte';
  import DishCard from '../menu/DishCard.svelte';
  import { MenuCategory } from '$lib/common/models/menu';

  let menuCategory:MenuCategory[] = []

  onMount(async () => {
    menuCategory = await cart.fetchMenuCategories();
  });

</script>

<div class="space-y-8">
  {#each menuCategory as category}
    {#if category.items.length > 0}      
      <section>
        <h2 class="text-2xl font-bold mb-4">{category.name}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {#each category.items as item}
          <DishCard {item} />
          {/each}
        </div>
      </section>
    {/if} 
  {/each}
</div>