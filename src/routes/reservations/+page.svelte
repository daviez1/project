<!-- Update the existing reservations page to include links to management and waitlist -->
<script lang="ts">
  // ... existing imports and code ...
</script>

<div class="container mx-auto px-4 py-12 max-w-4xl">
  <div class="bg-white rounded-lg shadow-lg p-8">
    <h1 class="text-3xl font-bold mb-4 text-center">Reserva tu mesa</h1>
    
    <div class="flex justify-center gap-4 mb-8">
      <a
        href="/reservations/manage"
        class="text-blue-600 hover:text-blue-700 font-medium"
      >
        Gestionar reservas
      </a>
      <a
        href="/reservations/waitlist"
        class="text-blue-600 hover:text-blue-700 font-medium"
      >
        Lista de espera
      </a>
    </div>
    
    <!-- ... rest of the existing reservation form ... -->
  </div>
</div>