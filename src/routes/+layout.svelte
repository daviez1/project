<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/client/components/layout/Navbar.svelte';
  import Footer from '$lib/client/components/layout/Footer.svelte';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  
   // Create a client
   const queryClient = new QueryClient()
   
</script>

<QueryClientProvider client={queryClient}>
  <div class="min-h-screen flex flex-col platypi">
    <Navbar />
    <main class="flex-grow">
      <slot /> 
    </main>
    <Footer />
  </div>
</QueryClientProvider>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Agbalumo&family=Platypi:ital,wght@0,300..800;1,300..800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Agbalumo&display=swap');

  .agbalumo-regular {
  font-family: "Agbalumo", serif;
  font-weight: 400;
  font-style: normal;
  }

.platypi {
  font-family: "Platypi", serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}

</style>