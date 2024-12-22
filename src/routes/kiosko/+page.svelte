<script lang="ts">
  import KioskoCategory from '$lib/client/components/kiosko/KioskoCategory.svelte';
  import * as KioskoCategoryTypes from '$lib/types/kiosko';
  import Cart from '$lib/client/components/ordenar/Cart.svelte';
  import { onMount } from 'svelte';
  import { cart } from '$lib/common/stores/cart';
  
  let kioskoCategories: KioskoCategoryTypes.KioskoCategory[] = []

  onMount( async()=>{
    kioskoCategories = await cart.fetchKioskoCategories()
  })
  </script>
  
  <svelte:head>
    <title>Kiosko - Galletas & Más</title>
  </svelte:head>
  
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center mb-8">Kiosko</h1>
    <p class="text-center text-gray-600 mb-12">Encuentra comida rápida y picadera</p>
    
    <div class="space-y-12">
      {#each kioskoCategories as category}
        <KioskoCategory {category} />
      {/each}
    </div>
    <Cart />
  </div>