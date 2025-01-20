<script lang="ts">
  import { onMount } from 'svelte';
  import type { MenuItem } from '$lib/types/menu';
  import { blur, slide, fly } from 'svelte/transition';
  import { capitalize } from '$lib/client/utils/capitalize';

  export let item: MenuItem;

</script>

<div class="w-full sm:w-4/5 h-fit mb-8 rounded-lg overflow-hidden m-auto transition-transform duration-500 ease-in-out transform hover:scale-105">
  <div in:fly={{ duration: 1000 }} class="h-4/5 relative">
    <img src={`/api/images/${item.image}`} alt={item.name} class="w-full h-[32rem] object-cover rounded-t-lg" />
    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
      <h3 class="text-4xl text-white font-semibold capitalize text-center">{item.name}</h3>
    </div>
  </div>
  <!--<div class="flex flex-col flex-grow text-center h-fit bg-white rounded-b-lg p-4">
     <div class="flex justify-between items-center">
      <p class="text-gray-600 w-7/10">{capitalize(item.description)}</p>
      <span class="text-gray-700 font-bold w-3/10 text-right">Precio: ${item.price.toFixed(2)}</span>
    </div> 
  </div>-->
</div>

<style>
  img {
    transition: transform 0.5s ease-in-out;
  }
</style>
