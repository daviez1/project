<script>
    export let direction
    let showSeeOrders
    
    function scrollToCart() {
    const cartElement = document.getElementById('cart');
    if (cartElement) {
      cartElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<button 
  on:click={scrollToCart}
  class="cursor-pointer inline bg-gray-800 px-3 py-2 rounded-md text-white tracking-wider shadow-xl animate-bounce hover:animate-none"
> Ver Pedidos 
{#if direction === 'down'}
    <svg class="w-6 h-6 inline text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19V5m0 14-4-4m4 4 4-4"/>
    </svg>
{/if}
{#if direction === 'up'}
    <svg class="w-6 h-6 inline text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v13m0-13 4 4m-4-4-4 4"/>
    </svg>
{/if}
  
</button>

<style>
  button{
    opacity: .7;
  }
</style>
