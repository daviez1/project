<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    let searchQuery = '';
    const dispatch = createEventDispatcher();
  
    function handleInput(event: any) {
      searchQuery = event.target.value;
      dispatch('search', { query: searchQuery });
    }
  </script>
  
  <spani class="search-bar mt-4">
    <input
      type="text"
      placeholder="Buscar productos..."
      bind:value={searchQuery}
      on:input={handleInput}
      class="p-2 shadow-md border rounded-lg"
    />
  </spani>
  
  <style>
    .search-bar {
      margin-bottom: 1rem;
    }
  </style>
  