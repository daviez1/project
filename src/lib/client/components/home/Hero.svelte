<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import Hanoi from '../../../../../assets/Hanoi.jpg'
  import * as animate from '$lib/common/constants/animate'
</script>

<section class="relative h-[600px] flex items-center justify-center bg-gray-900 mt-16 text-white">
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute inset-0 bg-black/60 z-0"></div>
    <img 
      src={Hanoi}
      alt="Restaurant interior" 
      class="w-full h-full object-cover"
    />
  </div>
  
  <div class="relative z-0 text-center px-4" in:fly>
    <h1 class="text-5xl font-bold mb-4">Bienvenido a nuestro Restaurant</h1>
    <p class="text-2xl mb-8">Disfruta de la deliciosa comida de esta ciudad</p>
    <div class="space-x-4">
      <a href="/ordenar" class="bg-white text-gray-900 border-2 border-gray px-6 py-3 rounded-lg font-semibold hover:bg-gray/10">
        Ver Menú
      </a>
      <a href="/ordenar" class="bg-white text-gray-900 border-2 border-gray px-6 py-3 rounded-lg font-semibold hover:bg-gray-40">
        Ordenar ahora
      </a>
    </div>
  </div>
</section>