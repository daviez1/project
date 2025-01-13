<script lang="ts">
  import { page } from '$app/stores';
  import * as animate from '$lib/common/constants/animate';
  import 'animate.css';
  import { onMount } from 'svelte';
  import LogoHanoi from './LogoHanoi.svelte';

  let showMenu = false;

  function toggleMenu() {
    showMenu = !showMenu;
  }
</script>

<div class="fixed top-0 w-full z-10">
  <nav class="bg-gradient-to-r from-gray-200 via-gray-300 to-white shadow-lg">
    <div>
      <div class="flex justify-between items-center h-16">
        <a href="/" class="font-bold {animate.animate_bounceInRight} inline text-2xl ml-8 text-gray-800">Restaurante Hanoi</a>
        <div class="md:hidden">
          <button on:click={toggleMenu} class="text-gray-800 hover:text-gray-600 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        <div class="hidden md:flex space-x-4 text-right mr-12">
          
          <a 
            href="/reservations" 
            class="text-gray-800 {animate.animate_bounceInRight} hover:text-gray-600 px-3 py-2 rounded-md"
            class:font-bold={$page.url.pathname === '/reservations'}>
            Reservaciones
          </a>
          <a 
            href="/kiosko" 
            class="text-gray-800 {animate.animate_bounceInRight} hover:text-gray-600 px-3 py-2 rounded-md"
            class:font-bold={$page.url.pathname === '/kiosko'}>
            Kiosko
          </a>
          <a 
            href="/ordenar" 
            class="text-gray-800 {animate.animate_bounceInRight} hover:text-gray-600 px-3 py-2 rounded-md"
            class:font-bold={$page.url.pathname === '/ordenar'}>
            Ver menú/Ordenar Pedido
          </a>
          <a 
            href="/gestionarPedidos" 
            class="text-gray-800 {animate.animate_bounceInRight} hover:text-gray-600 px-3 py-2 rounded-md"
            class:font-bold={$page.url.pathname === '/gestionarPedidos'}>
            Gestionar Pedidos
          </a>
          <a 
            href="/inventory" 
            class="text-gray-800 {animate.animate_bounceInRight} hover:text-gray-600 px-3 py-2 rounded-md"
            class:font-bold={$page.url.pathname === '/inventory'}>
            Inventario
          </a>
        </div>
      </div>
      
      <div class={`md:hidden ${showMenu ? 'block' : 'hidden'} text-center bg-gradient-to-r from-gray-200 via-gray-300 to-white border-t border-gray-300`}>
        <a 
          href="/reservations" 
          class="block text-gray-800 {animate.animate_bounceInRight} hover:text-gray-600 py-2 rounded-md"
          class:font-bold={$page.url.pathname === '/reservations'} on:click={toggleMenu}>
          Reservaciones
        </a>
        <a 
          href="/" 
          class="block text-gray-800 {animate.animate_bounceInRight} hover:text-gray-600 py-2 rounded-md"
          class:font-bold={$page.url.pathname === '/'} on:click={toggleMenu}>
          Home
        </a>
        <a 
          href="/kiosko" 
          class="block text-gray-800 {animate.animate_bounceInRight} hover:text-gray-600 px-3 py-2 rounded-md"
          class:font-bold={$page.url.pathname === '/kiosko'} on:click={toggleMenu}>
          Kiosko
        </a>
        <a 
          href="/ordenar" 
          class="block text-gray-800 {animate.animate_bounceInRight} hover:text-gray-600 px-3 py-2 rounded-md"
          class:font-bold={$page.url.pathname === '/ordenar'} on:click={toggleMenu}>
          Ver menú/Ordenar Pedido
        </a>
        <a 
          href="/gestionarPedidos" 
          class="block text-gray-800 {animate.animate_bounceInRight} hover:text-gray-600 px-3 py-2 rounded-md"
          class:font-bold={$page.url.pathname === '/gestionarPedidos'} on:click={toggleMenu}>
          Gestionar Pedidos
        </a>
      </div>
    </div>
  </nav>
</div>
