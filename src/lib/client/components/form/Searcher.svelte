<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    let searchQuery = '';
    const dispatch = createEventDispatcher();
  
    function handleInput(event: any) {
      searchQuery = event.target.value;
      dispatch('search', { query: searchQuery });
    }
  </script>
  
  <spani class="mt-4 md:ml-20 flex justify-center w-full md:w-fit">
    <input
      type="text"
      placeholder="Buscar productos..."
      bind:value={searchQuery}
      on:input={handleInput}
      class="p-2 md:p-1 text-sm md:text-md w-2/5 md:w-full shadow-md border rounded-lg"
    />
  </spani> 