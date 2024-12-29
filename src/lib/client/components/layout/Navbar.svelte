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
  <nav class="bg-white">
    <div>
      <div class="flex justify-between items-center h-16">
        <a href="/" class="font-bold {animate.animate_bounceInRight} inline text-xl ml-8">Restaurante Hanoi</a>
        <div class="md:hidden">
          <button on:click={toggleMenu} class="text-gray-700 hover:text-gray-900 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        <div class="hidden md:flex space-x-4 text-right mr-12">
          <a 
          href="/chillGuy" 
            class="text-gray-700 {animate.animate_bounceInRight} hover:text-gray-900 px-3 py-2 rounded-md"
            class:font-bold={$page.url.pathname === '/'}>
            Ver a Chill Guy😎
          </a>
          <a 
            href="/kiosko" 
            class="text-gray-700 {animate.animate_bounceInRight} hover:text-gray-900 px-3 py-2 rounded-md"
            class:font-bold={$page.url.pathname === '/kiosko'}>
            Kiosko
          </a>
          <a 
            href="/ordenar" 
            class="text-gray-700 {animate.animate_bounceInRight} hover:text-gray-900 px-3 py-2 rounded-md"
            class:font-bold={$page.url.pathname === '/ordenar'}>
            Ver menú/Ordenar Pedido
          </a>
          <a 
            href="/gestionarPedidos" 
            class="text-gray-700 {animate.animate_bounceInRight} hover:text-gray-900 px-3 py-2 rounded-md"
            class:font-bold={$page.url.pathname === '/gestionarPedidos'}>
            Gestionar Pedidos
          </a>
          <a 
            href="/inventory" 
            class="text-gray-700 {animate.animate_bounceInRight} hover:text-gray-900 px-3 py-2 rounded-md"
            class:font-bold={$page.url.pathname === '/inventory'}>
            Inventario
          </a>
        </div>
      </div>
      
      <div class={`md:hidden ${showMenu ? 'block' : 'hidden'} text-right`}>
        <a 
          href="/" 
          class="block text-gray-700 {animate.animate_bounceInRight} hover:text-gray-900 py-2 rounded-md"
          class:font-bold={$page.url.pathname === '/'} on:click={toggleMenu}>
          Home
        </a>
        <a 
          href="/chillGuy" 
          class="block text-gray-700 {animate.animate_bounceInRight} hover:text-gray-900 px-3 py-2 rounded-md"
          class:font-bold={$page.url.pathname === '/chillGuy'} on:click={toggleMenu}>
          Ver a Chill Guy😎
        </a>
        <a 
          href="/kiosko" 
          class="block text-gray-700 {animate.animate_bounceInRight} hover:text-gray-900 px-3 py-2 rounded-md"
          class:font-bold={$page.url.pathname === '/kiosko'} on:click={toggleMenu}>
          Kiosko
        </a>
        <a 
          href="/ordenar" 
          class="block text-gray-700 {animate.animate_bounceInRight} hover:text-gray-900 px-3 py-2 rounded-md"
          class:font-bold={$page.url.pathname === '/ordenar'} on:click={toggleMenu}>
          Ver menú/Ordenar Pedido
        </a>
        <a 
          href="/gestionarPedidos" 
          class="block text-gray-700 {animate.animate_bounceInRight} hover:text-gray-900 px-3 py-2 rounded-md"
          class:font-bold={$page.url.pathname === '/gestionarPedidos'} on:click={toggleMenu}>
          Gestionar Pedidos
        </a>
      </div>
    </div>
  </nav>
</div>