  <script lang="ts">
  import type { KioskoCategory } from '$lib/types/kiosko';
  import '../menu/Menu_Kiosko.css'    
  import DishCardInSection from '../menu/DishCardInSection.svelte';

  export let category: KioskoCategory;
  </script>

  <section>
    <details class="border rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
      <summary class="text-lg md:text-2xl font-bold mb-0 cursor-pointer bg-1 p-1 md:p-2 bg">
        <span class='text-gray-600 text-md md:text-xl bg'>{category.name}</span>
        <span class="text-gray-600 view-more pointer text-sm hover:text-lg md:text-md md:hover:text-lg lg:text-lg lg:hover:text-xl">Ver Más</span>
      </summary>
      <div class="grid grid-cols-1 {category.items.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1' } gap-6 justify-items-center p-4 bg">
        {#each category.items as item}
          <DishCardInSection {item} />
        {/each}
      </div>
    </details>
  </section>

<style>
  .bg{
    background-image: repeating-linear-gradient(148deg, hsla(54,0%,87%,0.12) 0px, hsla(54,0%,87%,0.12) 1px,transparent 1px, transparent 4px,hsla(54,0%,87%,0.12) 4px, hsla(54,0%,87%,0.12) 5px,transparent 5px, transparent 7px,hsla(54,0%,87%,0.12) 7px, hsla(54,0%,87%,0.12) 8px),repeating-linear-gradient(119deg, hsla(54,0%,87%,0.12) 0px, hsla(54,0%,87%,0.12) 1px,transparent 1px, transparent 4px,hsla(54,0%,87%,0.12) 4px, hsla(54,0%,87%,0.12) 5px,transparent 5px, transparent 7px,hsla(54,0%,87%,0.12) 7px, hsla(54,0%,87%,0.12) 8px),repeating-linear-gradient(0deg, hsla(54,0%,87%,0.15) 0px, hsla(54,0%,87%,0.15) 0px,transparent 0px, transparent 1px,hsla(54,0%,87%,0.15) 1px, hsla(54,0%,87%,0.15) 4px,transparent 4px, transparent 5px,hsla(54,0%,87%,0.15) 5px, hsla(54,0%,87%,0.15) 8px),repeating-linear-gradient(90deg, hsla(54,0%,87%,0.15) 0px, hsla(54,0%,87%,0.15) 0px,transparent 0px, transparent 1px,hsla(54,0%,87%,0.15) 1px, hsla(54,0%,87%,0.15) 4px,transparent 4px, transparent 5px,hsla(54,0%,87%,0.15) 5px, hsla(54,0%,87%,0.15) 8px),linear-gradient(90deg, rgb(251,251,251),rgb(251,251,251));
  }
  section{
    margin-top: 1em !important
  }
</style>