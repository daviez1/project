<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="min-h-[60vh] flex items-center justify-center">
  <div class="text-center">
    <h1 class="text-4xl font-bold mb-4">Error {$page.status}</h1>
    <p class="text-gray-600 mb-8">{$page.error?.message}</p>
    <a 
      href="/" 
      class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
    >
      Go Home
    </a>
  </div>
</div>