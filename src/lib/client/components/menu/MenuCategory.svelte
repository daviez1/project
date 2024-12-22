<script lang="ts">
  import type { MenuCategory } from '$lib/types/menu';
  import DishCardWithoutAction from './DishCardWithoutAction.svelte';
  
  export let category: MenuCategory;
</script>

<section class="mb-12">
  <h2 class="text-2xl font-bold mb-6">{category.name}</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each category.items as item}
      <DishCardWithoutAction {item} />
    {/each}
  </div>
</section>