<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/client/components/layout/Navbar.svelte';
  import Footer from '$lib/client/components/layout/Footer.svelte';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  import { afterUpdate } from "svelte";
  import Loading from '$lib/client/components/layout/Loading.svelte';

  let loading = true;

  afterUpdate(()=> loading = false)
   // Create a client
   const queryClient = new QueryClient()
   
</script>

{#if loading}
  <Loading />
{:else}
  <QueryClientProvider client={queryClient}>
    <div class="min-h-screen flex flex-col platypi bg">
      <Navbar />
      <main class="flex-grow">
        <slot /> 
      </main>
      <Footer />
    </div>
  </QueryClientProvider>
{/if}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Agbalumo&family=Platypi:ital,wght@0,300..800;1,300..800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Agbalumo&display=swap');
  
  .agbalumo-regular {
  font-family: "Agbalumo", serif;
  font-weight: 400;
  font-style: normal;
  }
  .bg{
    background-image: linear-gradient(112.5deg, rgb(214, 214, 214) 0%, rgb(214, 214, 214) 10%,rgb(195, 195, 195) 10%, rgb(195, 195, 195) 53%,rgb(176, 176, 176) 53%, rgb(176, 176, 176) 55%,rgb(157, 157, 157) 55%, rgb(157, 157, 157) 60%,rgb(137, 137, 137) 60%, rgb(137, 137, 137) 88%,rgb(118, 118, 118) 88%, rgb(118, 118, 118) 91%,rgb(99, 99, 99) 91%, rgb(99, 99, 99) 100%),linear-gradient(157.5deg, rgb(214, 214, 214) 0%, rgb(214, 214, 214) 10%,rgb(195, 195, 195) 10%, rgb(195, 195, 195) 53%,rgb(176, 176, 176) 53%, rgb(176, 176, 176) 55%,rgb(157, 157, 157) 55%, rgb(157, 157, 157) 60%,rgb(137, 137, 137) 60%, rgb(137, 137, 137) 88%,rgb(118, 118, 118) 88%, rgb(118, 118, 118) 91%,rgb(99, 99, 99) 91%, rgb(99, 99, 99) 100%),linear-gradient(135deg, rgb(214, 214, 214) 0%, rgb(214, 214, 214) 10%,rgb(195, 195, 195) 10%, rgb(195, 195, 195) 53%,rgb(176, 176, 176) 53%, rgb(176, 176, 176) 55%,rgb(157, 157, 157) 55%, rgb(157, 157, 157) 60%,rgb(137, 137, 137) 60%, rgb(137, 137, 137) 88%,rgb(118, 118, 118) 88%, rgb(118, 118, 118) 91%,rgb(99, 99, 99) 91%, rgb(99, 99, 99) 100%),linear-gradient(90deg, rgb(195, 195, 195),rgb(228, 228, 228)); background-blend-mode:overlay,overlay,overlay,normal;
  }
.platypi {
  font-family: "Platypi", serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}

</style>