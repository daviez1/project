<script lang="ts">
  import Hero from '$lib/client/components/home/Hero.svelte';
  import FeaturedDishes from '$lib/client/components/home/FeaturedDishes.svelte';
  import { onMount } from 'svelte';
  import LazyLoad from 'vanilla-lazyload';

  let lazyLoadInstance;

  console.log('Script cargado');

  onMount(() => {
    // Seleccionar todas las imágenes y agregar la clase 'lazy'
    const images = document.querySelectorAll('img');
    images.forEach(img => img.classList.add('lazy'));

    // Inicializar LazyLoad
    lazyLoadInstance = new LazyLoad({
      elements_selector: ".lazy"
    });
  });
</script>

<svelte:head>
  <title>Restaurant Hanoi - Bienvenidos</title>
</svelte:head>

<Hero />
<FeaturedDishes />

<style>
  .lazy {
    opacity: 0;
    transition: opacity 0.3s;
  }

  .lazy.loaded {
    opacity: 1;
  }
</style>