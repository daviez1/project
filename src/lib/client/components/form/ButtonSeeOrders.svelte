<script>
  import { cart } from "$lib/common/stores/cart";

  function scrollToCart() {
    const cartElement = document.getElementById("cart");
    if (cartElement) {
      cartElement.scrollIntoView({ behavior: "smooth" });
    }
  }
</script>

<div class="w-fit animate-bounce relative inline-block">
  <span
    class="z-1 absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-full"
    >{$cart.length}</span
  >
  <div class="button-container bg-gray-500 items-center rounded-md">
    <button class="button bg-transparent flex items-center text-white pointer" on:click={ scrollToCart }>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        stroke-linejoin="round"
        stroke-linecap="round"
        viewBox="0 0 24 24"
        stroke-width="2"
        fill="none"
        stroke="currentColor"
        class="icon"
      >
        <circle r="1" cy="21" cx="9"></circle>
        <circle r="1" cy="21" cx="20"></circle>
        <path
          d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
        ></path>
      </svg>
    </button>
  </div>
</div>

<style>
  .button {
    outline: 0 !important;
    border: 0 !important;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    justify-content: center;
    transition: all ease-in-out 0.3s;
    }

  .button:hover {
    transform: translateY(-3px);
  }
  .icon {
    font-size: 20px;
  }
</style>
