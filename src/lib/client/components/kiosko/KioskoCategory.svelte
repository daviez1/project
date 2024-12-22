<script lang="ts">
    import type { KioskoCategory } from '$lib/types/kiosko';
    import KioskoItemCard from './KioskoItemCard.svelte';
       
    export let category: KioskoCategory;
  </script>
  
  <section>
    <h2 class="text-2xl font-bold mb-6">{category.name}</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {#each category.items as item}
        <KioskoItemCard {item} />
      {/each}
    </div>
  </section>