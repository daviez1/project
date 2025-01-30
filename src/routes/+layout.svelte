<script lang="ts">
  import '../app.css';
  import "animate.css";
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