<script lang="ts">
  import { showMenu } from '$lib/common/stores/menuVisible';
</script>

<button class="relative flex items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-gray-200 border-none text-gray-800 hover:text-gray-700 focus:outline-none">
  <input type="checkbox" bind:checked={$showMenu} class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />

  <!-- hamburger icon -->
  {#if !$showMenu}
    
  <svg
  class="swap-off fill-current "
  xmlns="http://www.w3.org/2000/svg"
  width="32"
  height="32"
  viewBox="0 0 512 512"
  >
    <path
    d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"
    />
  </svg>
  {:else}
  <!-- close icon -->
  <svg
  class="swap-on fill-current"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 512 512"
    >
    <polygon
    points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
    />
  </svg>
  {/if}
</button>