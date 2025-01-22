<script>
    import { welcome } from "$lib/common/data/home";
    import Hanoi from "$lib/client/assets/columpio de chill guy.jpg";
  import { animate__fadeInLeft, animate__fadeInRight } from "$lib/common/constants/animate";
  </script>
  
  <div class="mt-2 lg:mt-8 h-2/5">
    <div class="max-w-5xl mx-auto flex flex-wrap h-fit lg:flex-nowrap items-center">
      <div class="w-full lg:w-8/12 text-center {animate__fadeInLeft}">
        <p class="text-xl leading-8 font-extrabold tracking-tight text-gray-700 sm:text-4xl">
          {welcome[0].header}
        </p>
        <p class="responsive-text mt-1 mr-4 sm:mt-8 text-xl sm:text-2xl text-gray-500">
          {welcome[0].text}
        </p>
      </div>
      <div class="w-full lg:w-4/12 hidden lg:flex justify-center">
        <img src={Hanoi} alt="Imagen del restaurante" class="rounded-lg { animate__fadeInRight } shadow-lg object-contain h-4/5">
      </div>
    </div>
  </div>
  <style>
    @media (max-width: 400px) {
      .responsive-text {
        font-size: 1.125rem; /* 18px */
        line-height: 1.75rem; /* 28px */
      }
    }
    </style>
  