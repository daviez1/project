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
  
  <style>
    /* .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 50;
    }
    .alert{
        color: red;
    } */
  </style>
  