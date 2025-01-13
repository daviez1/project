<script lang="ts">
  import { reservationStore } from '$lib/common/stores/reservations';
  import { reservationSettings } from '$lib/common/data/reservationSettings';
  import { onMount } from 'svelte';
  
  let userEmail = '';
  let userReservations: any[] = [];
  
  function loadUserReservations() {
    if (!userEmail) return;
    
    userReservations = $reservationStore
      .filter((res:any) => res.email === userEmail && res.status !== 'cancelled')
      .sort((a:any , b:any) => a.date.getTime() - b.date.getTime());
  }
  
  async function handleCancel(reservationId: string) {
    const reservation = userReservations.find(r => r.id === reservationId);
    if (!reservation) return;
    
    const today = new Date();
    const reservationDate = new Date(reservation.date);
    const daysUntilReservation = Math.ceil(
      (reservationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysUntilReservation < reservationSettings.cancellationDays) {
      alert(`Las cancelaciones deben realizarse con al menos ${reservationSettings.cancellationDays} días de antelación`);
      return;
    }
    
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      reservationStore.cancelReservation(reservationId);
      loadUserReservations();
      alert('Reserva cancelada. Recibirás un email con la confirmación.');
    }
  }
</script>

<div class="container mx-auto px-4 py-12 max-w-4xl">
  <div class="bg-white rounded-lg shadow-lg p-8">
    <h1 class="text-3xl font-bold mb-8 text-center">Gestionar Reservas</h1>
    
    <div class="mb-8">
      <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
        Email de la reserva
      </label>
      <div class="flex gap-4">
        <input
          type="email"
          bind:value={userEmail}
          placeholder="Introduce tu email"
          class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          on:click={loadUserReservations}
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>
    </div>
    
    {#if userReservations.length === 0}
      <p class="text-center text-gray-500 py-8">
        No se encontraron reservas para este email
      </p>
    {:else}
      <div class="space-y-6">
        {#each userReservations as reservation}
          <div class="border rounded-lg p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="font-semibold text-lg">
                  Reserva para {reservation.guests} personas
                </h3>
                <p class="text-gray-600">
                  {new Date(reservation.date).toLocaleDateString()} a las {reservation.time}
                </p>
              </div>
              <span class="px-3 py-1 rounded-full text-sm font-medium
                {reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                {reservation.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
              </span>
            </div>
            
            <div class="space-y-2 text-sm text-gray-600">
              <p>Nombre: {reservation.name}</p>
              <p>Teléfono: {reservation.phone}</p>
              {#if reservation.allergies}
                <p>Alergias: {reservation.allergies}</p>
              {/if}
            </div>
            
            <div class="mt-6 flex justify-end gap-4">
              <button
                on:click={() => handleCancel(reservation.id)}
                class="text-red-600 hover:text-red-700 font-medium"
              >
                Cancelar reserva
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>