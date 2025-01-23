<script>
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
  
    function closeModal() {
      dispatch('close');
    }
  </script>
  
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden w-11/12 md:w-1/3">
      <div class="p-4">
        <slot></slot>
      </div>
      <button on:click={closeModal} class="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800">
        &times;
      </button>
    </div>
  </div>  