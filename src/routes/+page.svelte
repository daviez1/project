<script lang="ts">
  import Hero from "$lib/client/components/home/Hero.svelte";
  import FeaturedDishes from '$lib/client/components/home/FeaturedDishes.svelte';
  import WelcomeText from "$lib/client/components/home/WelcomeText.svelte";
</script>

<svelte:head>
  <title>Restaurant Hanoi - Bienvenidos</title>
</svelte:head>

<Hero />
<WelcomeText/>
<FeaturedDishes />