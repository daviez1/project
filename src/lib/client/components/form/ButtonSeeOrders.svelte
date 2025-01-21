<script>
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
> Ver Pedidos</button>

<style>
  button{
    opacity: .7;
  }
</style>
