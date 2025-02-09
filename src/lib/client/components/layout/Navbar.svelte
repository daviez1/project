<script lang="ts">
  import { page } from "$app/stores";
  import * as animate from "$lib/common/constants/animate";
  import { showMenu } from "$lib/common/stores/menuVisible";
  import Hamburger from "../buttons/Hamburger.svelte";
  import DropdownManage from "./DropdownManage.svelte";

  const toggleMenu = () => !$showMenu;
  const closeMenu = () => showMenu.set(false);
</script>

<div class="fixed top-0 w-full z-20">
  <nav class="shadow-lg bg-opacity-25">
    <div
      class="bg-transparent md:bg-gradient-to-b md:from-gray-400 md:via-gray-100 md:to-white"
    >
      <div
        class="flex justify-between items-center h-16 bg-gradient-to-b from-gray-400 via-gray-100 to-white"
      >
        <a
          href="/"
          class="font-bold {animate.animate_bounceInLeft} inline text-xl sm:text-2xl ml-4 sm:ml-8 text-gradient-primary"
          >Restaurante Hanoi</a
        >
        <div class="md:hidden">
          <Hamburger />
        </div>

        <div class="hidden md:flex space-x-4 text-right ml-8 lg:mr-12">
          <a
            href="/reservations"
            class="text-gray-800 {animate.animate_bounceInRight} hover:text-gray-600 py-2 rounded-md text-sm lg:text-lg"
            class:font-bold={$page.url.pathname === "/reservations"}
          >
            Reservaciones
          </a>
          <a
            href="/kiosko"
            class="text-gray-800 {animate.animate_bounceInRight} hover:text-gray-600 px-2 py-2 rounded-md text-sm lg:text-lg"
            class:font-bold={$page.url.pathname === "/kiosko"}
          >
            Kiosko
          </a>
          <a
            href="/ordenar"
            class="text-gray-800 {animate.animate_bounceInRight} hover:text-gray-600 py-2 rounded-md text-sm lg:text-lg"
            class:font-bold={$page.url.pathname === "/ordenar"}
          >
            Menú/Pedidos
          </a>
          <DropdownManage {toggleMenu} {closeMenu} />
        </div>
      </div>

      <div
        class="md:hidden absolute right-0 dropdown-content menu bg-gray-800 bg-opacity-[.99] rounded-lg rounded-box z-[1] w-fit px-4 py-2 {$showMenu
          ? 'block'
          : 'hidden'} {animate.animate_bounceInRight}"
      >
        <ul>
          <li>
            <a
              href="/"
              class="block text-gray-200 hover:text-gray-600 py-2 font-normal text-right"
              class:font-bold={$page.url.pathname === "/"}
              on:click={toggleMenu}
              on:click={closeMenu}
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="/reservations"
              class="block text-gray-200 hover:text-gray-600 py-2 font-normal text-right"
              class:font-bold={$page.url.pathname === "/reservations"}
              on:click={toggleMenu}
              on:click={closeMenu}
            >
              Reservaciones
            </a>
          </li>
          <li>
            <a
              href="/ordenar"
              class="block text-gray-200 hover:text-gray-600 py-2 font-normal text-right"
              class:font-bold={$page.url.pathname === "/ordenar"}
              on:click={toggleMenu}
              on:click={closeMenu}
            >
              Menú/Pedidos
            </a>
          </li>
          <li>
            <a
              href="/kiosko"
              class="block text-gray-200 hover:text-gray-600 py-2 font-normal text-right"
              class:font-bold={$page.url.pathname === "/kiosko"}
              on:click={toggleMenu}
              on:click={closeMenu}
            >
              Kiosko
            </a>
          </li>
          <hr />
          <li>
            <a
              href="/inventory"
              class="block text-gray-200 hover:text-gray-600 py-2 font-normal text-right"
              class:font-bold={$page.url.pathname === "/inventory"}
              on:click={toggleMenu}
              on:click={closeMenu}
              >
              Inventario
            </a>
            <a
            href="/gestionarPedidos"
            class="block text-gray-200 hover:text-gray-600 py-2 font-normal text-right"
            class:font-bold={$page.url.pathname === "/gestionarPedidos"}
            on:click={toggleMenu}
            on:click={closeMenu}
            >
            Gestionar Pedidos
          </a>
            <a
            href="/reservations/manage/waitlist"
            class="block text-gray-200 hover:text-gray-600 py-2 font-normal text-right"
            class:font-bold={$page.url.pathname ===
                "/reservations/manage/waitlist"}
                on:click={toggleMenu}
                on:click={closeMenu}
                >
                Lista de espera
              </a>
              <a
              href="/reservations/manage"
              class="block text-gray-200 hover:text-gray-600 py-2 font-normal text-right"
              class:font-bold={$page.url.pathname === "/reservations/manage"}
              on:click={toggleMenu}
              on:click={closeMenu}
              >
              Reservas
            </a>
            <a
            href="/reservations/tables"
            class="block text-gray-200 hover:text-gray-600 py-2 font-normal text-right"
            class:font-bold={$page.url.pathname === "/reservations/tables"}
            on:click={toggleMenu}
            on:click={closeMenu}
            >
              Mesas
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>
