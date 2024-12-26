<!-- <script lang="ts">
  import * as MenuItemApi from '$lib/common/api/menuItems';
  import { createQuery } from '@tanstack/svelte-query'
  import { GetMenuItems } from '$lib/common/constants/queries';
  
    const query = createQuery({
      queryKey: [GetMenuItems],
      queryFn: async() => await MenuItemApi.get(),
    })
  </script>
  
  <div>
    <h1 class="mt-20">Todos</h1>
    {#if $query.isLoading}
      <p>Loading...</p>
    {:else if $query.isError}
      <p>Error: {$query.error.message}</p>
    {:else if $query.isSuccess}
      {#each $query.data as todo}
        <p>{todo.name}</p>
      {/each}
    {/if}
  </div> -->