<script lang="ts">
  import { page } from "$app/stores";
  import { onMount, onDestroy } from "svelte";

  let isOpen = false;

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function handleClickOutside(event:any) {
    const menuButton = document.getElementById("menu-button");
    const dropdownMenu = document.getElementById("dropdown-menu");
    if (menuButton && dropdownMenu && !menuButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
      isOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onDestroy(() => {
    document.removeEventListener("click", handleClickOutside);
  });

  export let toggleMenu;
  export let closeMenu;
</script>

<div class="relative inline-block text-left">
  <div>
    <button
      type="button"
      class="inline-flex w-full justify-center gap-x-1.5 bg-white/50 rounded-md px-2 py-1 text-sm lg:text-lg font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50/80"
      id="menu-button"
      aria-expanded={isOpen}
      aria-haspopup="true"
      on:click={toggleDropdown}
    >
      Administración
      <svg
        class="-mr-1 size-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        data-slot="icon"
      >
        <path
          fill-rule="evenodd"
          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>

  <div
    class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden {isOpen ? 'block' : 'hidden'}"
    id="dropdown-menu"
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="menu-button"
    tabindex="-1"
  >
    <div class="py-1" role="none">
      <a
        href="/inventory"
        class="block hover:text-gray-600 ml-4 py-2 font-normal"
        class:font-bold={$page.url.pathname === "/inventory"}
        on:click={toggleMenu}
        on:click={closeMenu}
      >
        Inventario
      </a>
      <a
        href="/gestionarPedidos"
        class="block text-gray-800 hover:text-gray-600 ml-4 py-2 font-normal"
        class:font-bold={$page.url.pathname === "/gestionarPedidos"}
      >
        Gestionar Pedidos
      </a>
      <a
        href="/reservations/manage/waitlist"
        class="block text-gray-800 hover:text-gray-600 ml-4 py-2 font-normal"
        class:font-bold={$page.url.pathname === "/reservations/manage/waitlist"}
      >
        Lista de espera
      </a>
      <a
        href="/reservations/manage"
        class="block text-gray-800 hover:text-gray-600 ml-4 py-2 font-normal"
        class:font-bold={$page.url.pathname === "/reservations/manage"}
      >
        Reservas
      </a>
      <a
        href="/reservations/tables"
        class="block text-gray-800 hover:text-gray-600 ml-4 py-2 font-normal"
        class:font-bold={$page.url.pathname === "/reservations/tables"}
      >
        Mesas
      </a>
    </div>
  </div>
</div>

<style>
  .hidden {
    display: none;
  }
  .block {
    display: block;
  }
</style>
