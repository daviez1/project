<script lang="ts">
  import { featuredItems } from '$lib/common/data/menu';
  import type { MenuItem } from '$lib/types/menu';
  import { onMount } from 'svelte';
  import DishCard from '../menu/DishCard.svelte';
  import { cart } from '$lib/common/stores/cart';
  import Cart from '../ordenar/Cart.svelte';
  import ButtonSeeOrders from '../form/ButtonSeeOrders.svelte';

  let menuItems: MenuItem[] = [];
  let showSeeOrders = true;
  let direction = 'down';
  console.log($cart);

  onMount(async () => {
    menuItems = await cart.fetchMenuItems();
    setInterval(async () => {
      let inicio = 0, fin = 2;
      menuItems.slice(inicio, fin);
      inicio += 3; fin += 2;
    }, 3000);

    const cartElement = document.getElementById('cart');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          showSeeOrders = false;
        } else {
          showSeeOrders = true;
        }
      });
    });

    if (cartElement) {
      observer.observe(cartElement);
    }
  });

</script>

<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12">Algunos de nuestros platos</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each menuItems as item}
        <DishCard {item} />
      {/each}
    </div>
  </div>
  {#if $cart.length > 0}
    {#if showSeeOrders}
      <div class="fixed top-20 right-4 z-50">
        <ButtonSeeOrders {direction}/>
      </div>
    {/if}
    <div id="cart">
      <Cart />
    </div>
  {/if}
</section>
