<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import Hanoi from '../../../../../assets/Hanoi.jpg'
  import * as animate from '$lib/common/constants/animate'
</script>

<section class="relative h-[600px] flex items-center justify-center bg-gray-900 text-white">
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute inset-0 bg-black/50 z-10"></div>
    <img 
      src={Hanoi}
      alt="Restaurant interior" 
      class="w-full h-full object-cover {animate.animate_bounceInRight}"
    />
  </div>
  
  <div class="relative z-20 text-center px-4" in:fly>
    <h1 class="text-5xl font-bold mb-4">Bienvenido a nuestro Restaurant</h1>
    <p class="text-xl mb-8">Disfruta de la deliciosa comida de esta ciudad</p>
    <div class="space-x-4">
      <a href="/menu" class="bg-white {animate.animate_bounceInRight} text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
        Ver Menú
      </a>
      <a href="/ordenar" class="bg-transparent {animate.animate_bounceInRight} border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10">
        Ordenar ahora
      </a>
    </div>
  </div>
</section>