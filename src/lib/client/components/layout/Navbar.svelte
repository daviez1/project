<script lang="ts">
  import { page } from '$app/stores';
  import * as animate from '$lib/common/constants/animate';
  import 'animate.css';
</script>

<nav class="bg-white shadow-lg">
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center h-16">
      <a href="/" class="font-bold {animate.animate_bounceInLeft} text-xl">Restaurant Hanoi</a>
      
      <div class="flex space-x-4">
        <a 
          href="/" 
          class="text-gray-700 {animate.animate_bounceInLeft} hover:text-gray-900 py-2 rounded-md"
          class:font-bold={$page.url.pathname === '/'}>
          Home
        </a>
        <a 
          href="/chillGuy" 
          class="text-gray-700 {animate.animate_bounceInLeft} hover:text-gray-900 px-3 py-2 rounded-md"
          class:font-bold={$page.url.pathname === '/'}>
          Ver a Chill Guy😎
        </a>
        <a 
          href="/kiosko" 
          class="text-gray-700 {animate.animate_bounceInLeft} hover:text-gray-900 px-3 py-2 rounded-md"
          class:font-bold={$page.url.pathname === '/kiosko'}>
          Kiosko
        </a>
        <a 
          href="/ordenar" 
          class="text-gray-700 {animate.animate_bounceInLeft} hover:text-gray-900 px-3 py-2 rounded-md"
          class:font-bold={$page.url.pathname === '/ordenar'}>
          Ver menú/Ordenar Pedido
        </a>
        <a 
          href="/gestionarPedidos" 
          class="text-gray-700 {animate.animate_bounceInLeft} hover:text-gray-900 px-3 py-2 rounded-md"
          class:font-bold={$page.url.pathname === '/gestionarPedidos'}>
          Gestionar Pedidos
        </a>
      </div>
    </div>
  </div>
</nav>