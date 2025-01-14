<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    export let currentPage: number;
    export let itemsPerPage: number;
    export let totalItems: number;
  
    const dispatch = createEventDispatcher();
  
    function nextPage() {
      if (currentPage * itemsPerPage < totalItems) {
        dispatch('pageChange', currentPage + 1);
      }
    }
  
    function prevPage() {
      if (currentPage > 1) {
        dispatch('pageChange', currentPage - 1);
      }
    }
  
    function goToPage(page: number) {
      dispatch('pageChange', page);
    }
  </script>
  
  <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between sm:hidden">
      <button on:click={prevPage} disabled={currentPage === 1} class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</button>
      <button on:click={nextPage} disabled={currentPage * itemsPerPage >= totalItems} class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</button>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>
          to
          <span class="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span>
          of
          <span class="font-medium">{totalItems}</span>
          results
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-xs" aria-label="Pagination">
          <button on:click={prevPage} disabled={currentPage === 1} class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            <span class="sr-only">Previous</span>
            <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
              <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
            </svg>
          </button>
          {#each Array(Math.ceil(totalItems / itemsPerPage)) as _, index (index)}
            <button on:click={() => goToPage(index + 1)} class="relative inline-flex items-center px-4 py-2 text-sm font-semibold {currentPage === index + 1 ? 'bg-gray-400 text-white' : 'text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50'} focus:z-20 focus:outline-offset-0">
              {index + 1}
            </button>
          {/each}
          <button on:click={nextPage} disabled={currentPage * itemsPerPage >= totalItems} class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            <span class="sr-only">Next</span>
            <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
              <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>