<script lang="ts">
    import { onMount } from 'svelte';
  
    export let message: string;
    export let duration: number = 3000; // Duración en milisegundos
    export let onClose: () => void;
  
    let visible = false;
  
    onMount(() => {
      visible = true;
      const timer = setTimeout(() => {
        visible = false;
        onClose();
      }, duration);
  
      return () => clearTimeout(timer);
    });
  </script>
  
  <style>
    .toast {
      position: fixed;
      top: 5em;
      right: 20px;
      background-color: #4caf50; /* Color verde */
      color: white;
      padding: 16px;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      transition: opacity 0.5s ease;
      opacity: 0;
    }
    .toast.visible {
      opacity: 1;
    }
  </style>
  
  <div class="toast {visible ? 'visible' : ''}">
    {message}
  </div>
  