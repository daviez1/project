<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import Hanoi from './Hanoi.jpg'
  import { goto } from '$app/navigation';
</script>

<section class="relative h-3/5 md:h-3/5 flex items-center justify-center bg-gray-900 text-white">
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute inset-0 bg-black/60 z-0"></div>
    <img 
      src={Hanoi}
      alt="Restaurant interior" 
      class="w-full h-full object-cover"
    />
  </div>
  
  <div class="navbar relative z-0 text-center p-4 rounded-lg h-fit" in:fly>
    <span class="z-100">
      <h1 class="text-3xl md:text-5xl font-bold mb-8 md:mb-4">Bienvenido a nuestro Restaurante</h1>
      <p class="hidden md:block text-center md:text-2xl font-bold mb-8">Disfruta de la deliciosa comida de esta ciudad</p>
    </span>
    <div class="space-x-4">
      <button on:click={ ()=> goto('ordenar') } class="bg-white text-gray-900 border-2 border-gray px-2 md:px-4 py-1 md:py-2 rounded-lg font-semibold hover:bg-gray/10">
        Ver Menú
      </button>
      <button on:click={ ()=> goto( 'reservations' ) } class="bg-white text-gray-900 border-2 border-gray px-2 md:px-4 py-1 md:py-2 rounded-lg font-semibold hover:bg-gray-40">
        Reservar ahora
      </button>
    </div>
  </div>
</section>

<style>
  .navbar{
    backdrop-filter: blur(5px);
    box-shadow: 0px 0px 30px rgba(192, 192, 192, 0.37);
    border: 0px solid rgba(211, 195, 195, 0.18);
  }
</style>