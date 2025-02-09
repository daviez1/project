<script lang="ts">
  import Hero from "$lib/client/components/home/Hero.svelte";
  import FeaturedDishes from '$lib/client/components/home/FeaturedDishes.svelte';
  import WelcomeText from "$lib/client/components/home/WelcomeText.svelte";  
  import Location from "$lib/client/components/home/Location.svelte";
</script>

<svelte:head>
  <title>Restaurant Hanoi - Bienvenidos</title>
</svelte:head>


<div class="h-screen">
  <Hero />
  <WelcomeText/>
  </div>
  <FeaturedDishes />
  <Location />