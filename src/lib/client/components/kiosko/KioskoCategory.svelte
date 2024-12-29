  <script lang="ts">
    import type { KioskoCategory } from '$lib/types/kiosko';
    import KioskoItemCard from './KioskoItemCard.svelte';
  import '../menu/Menu_Kiosko.css'    

  export let category: KioskoCategory;
  </script>
  
  <section>
    <details class="border rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
      <summary class="text-2xl font-bold mb-0 cursor-pointer bg-gray-100 p-4 hover:bg-gray-200">
        <span class="text-gray-600">{category.name}</span>
        <span class="view-more">Ver Más</span>
      </summary>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center p-4 bg-white">
        {#each category.items as item}
          <KioskoItemCard {item} />
        {/each}
      </div>
    </details>
  </section>