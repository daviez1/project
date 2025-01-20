<script>
    import { welcome } from "$lib/common/data/home";
    import Hanoi from "$lib/client/assets/columpio de chill guy.jpg";
  import { animate__fadeInLeft, animate__fadeInRight } from "$lib/common/constants/animate";
  </script>
  
  <div class="mt-2 h-fit">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap h-fit lg:flex-nowrap items-center">
      <div class="w-full lg:w-8/12 text-center {animate__fadeInLeft}">
        <p class="text-xl leading-8 font-extrabold tracking-tight text-gray-700 md:text-4xl">
          {welcome[0].header}
        </p>
        <p class="mt-1 mr-4 md:mt-8 text-md md:text-xl text-gray-500">
          {welcome[0].text}
        </p>
      </div>
      <div class="w-full lg:w-4/12 hidden lg:flex justify-center">
        <img src={Hanoi} alt="Imagen del restaurante" class="rounded-lg { animate__fadeInRight } shadow-lg object-contain h-4/5">
      </div>
    </div>
  </div>
  