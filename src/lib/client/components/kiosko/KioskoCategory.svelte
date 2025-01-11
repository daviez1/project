  <script lang="ts">
    import type { KioskoCategory } from '$lib/types/kiosko';
  import '../menu/Menu_Kiosko.css'    
  import DishCardInSection from '../menu/DishCardInSection.svelte';

  export let category: KioskoCategory;
  </script>

  <section>
    <details class="border rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
      <summary class="text-2xl font-bold mb-0 cursor-pointer bg-gray-100 p-2 hover:bg-gray-200">
        <span class="text-gray-600">{category.name}</span>
        <span class="view-more">Ver Más</span>
      </summary>
      <div class="grid grid-cols-1 {category.items.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1' } gap-6 justify-items-center p-4 bg-white">
        {#each category.items as item}
          <DishCardInSection {item} />
        {/each}
      </div>
    </details>
  </section>

<style>
  section{
    margin-top: 1em !important
  }
</style>