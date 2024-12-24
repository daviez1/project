<script lang="ts">
  import { featuredItems } from '$lib/common/data/menu';
  import type { MenuItem } from '$lib/types/menu';
  import { onMount } from 'svelte';
  import DishCard from '../menu/DishCard.svelte';
  import { cart } from '$lib/common/stores/cart';

  let menuItems: MenuItem[] = []

  onMount(async()=>{
    menuItems = await cart.fetchMenuItems()
    setInterval(async() => {
      let inicio = 0, fin = 2
      menuItems.slice(inicio, fin)
      inicio += 3; fin +=2;
    }, 3000);
  })
</script>

<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12">Algunos de nuestros platos</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each menuItems as item}
        <DishCard {item} />
      {/each}
    </div>
  </div>
</section>