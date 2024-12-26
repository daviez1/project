<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/client/components/layout/Navbar.svelte';
  import Footer from '$lib/client/components/layout/Footer.svelte';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  
   // Create a client
   const queryClient = new QueryClient()
   
</script>

<QueryClientProvider client={queryClient}>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow">
      <slot /> 
    </main>
    <Footer />
  </div>
</QueryClientProvider>
