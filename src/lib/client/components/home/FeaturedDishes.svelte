<script lang="ts">
  import { featuredItems } from '$lib/common/data/menu';
  import type { MenuItem } from '$lib/types/menu';
  import DishCard from '../menu/DishCard.svelte';
</script>

<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12">Algunos de nuestros platos</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each featuredItems as item}
        <DishCard {item} />
      {/each}
    </div>
  </div>
</section>