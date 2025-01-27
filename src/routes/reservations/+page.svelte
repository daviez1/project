<script lang="ts">
  import { waitlist } from '$lib/common/stores/waitlist';
  import { reservationSettings } from '$lib/common/data/reservationSettings';
  import { reservationStore } from '$lib/common/stores/reservations';
  import type { TableReservation, WaitlistEntry } from '$lib/types/reservation';
  import Manage from '$lib/client/components/reservations/Manage.svelte';
  import { onMount } from 'svelte';
  import ToastComplete from '$lib/client/components/notifications/ToastComplete.svelte';
  import { goto } from '$app/navigation';
  
  onMount(async()=> await reservationStore.getReservations() )

  let showToast = false

  let date: string = '';
  let preferredTimes: string[] = [];
  let guests = 2;
  let name = '';
  let email = '';
  let phone = '';
  let notes = '';
  
  const timeSlots = [
    ...reservationSettings.serviceTimes.lunch.map(slot => slot.time),
    ...reservationSettings.serviceTimes.dinner.map(slot => slot.time)
  ];
  
  function handleSubmit() {
    if (!date || preferredTimes.length === 0) return;
    const entry: WaitlistEntry = {
      id: crypto.randomUUID(),
      date: new Date(date),
      preferredTimes,
      guests,
      name,
      email,
      phone,
      notes,
      status: 'waiting',
      createdAt: new Date()
    };

  const tableReservation:TableReservation[] = [{
  id: '1',
  tableId: '1',
  reservationId: entry.id,
  startTime: entry.preferredTimes[0],
  endTime: entry.preferredTimes[0],
  status: 'reserved'
}]
    
    waitlist.add(entry);
    // reservationStore.setReservations(tableReservation)
    reservationStore.addReservation(tableReservation[0])
    showToast = true
    
    // Reset form
    preferredTimes = [];
    notes = '';
    name = '';
    email = '';
    phone = '';
  }

  const onClose = () => showToast = false; 

</script>

<svelte:head>
  <title>Reservaciones</title>
</svelte:head>

<div class="container mx-auto px-4 py-28 max-w-4xl">
  <div class="bg-white rounded-lg shadow-lg p-8">
    <h1 class="text-3xl font-bold mb-8 text-center">Reserve su mesa</h1>
    
    <p class="text-gray-600 mb-8 text-center">
      Si no hay disponibilidad para la fecha deseada, únete a nuestra lista de espera.
      Te contactaremos si hay una cancelación.
    </p>
    <!-- <h1>{ JSON.stringify($waitlist) }</h1> -->
    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="date" class="block text-sm font-medium text-gray-700">Fecha deseada</label>
          <input
            id="date"
            type="date"
            bind:value={date}
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
        </div>
        
        <div>
          <label for="hours" class="block text-sm font-medium text-gray-700">Horarios preferidos</label>
          <div class="mt-2 grid grid-cols-2 gap-2">
            {#each timeSlots as time}
              <label class="flex items-center">
                <input
                type="checkbox"
                  value={time}
                  bind:group={preferredTimes}
                  class="rounded text-blue-600"
                  />
                  <span class="ml-2 text-sm">{time}</span>
                </label>
                {/each}
              </div>
        </div>
        
        <div>
          <label for="number" class="block text-sm font-medium text-gray-700">Número de comensales</label>
          <input
          id="number"
          type="number"
          bind:value={guests}
          min={reservationSettings.minGuestsPerBooking}
          max={reservationSettings.maxGuestsPerBooking}
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
        </div>
        
        <div>
          <label for="fullName" class="block text-sm font-medium text-gray-700">Nombre completo</label>
          <input
            id="fullName"
            type="text"
            bind:value={name}
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
            id="email"
            type="email"
            bind:value={email}
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
            id="phoneNumber"
            type="tel"
            bind:value={phone}
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
          
          <div class="md:col-span-2">
            <label for="notes" class="block text-sm font-medium text-gray-700">Notas adicionales</label>
            <textarea
            id="notes"
            bind:value={notes}
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            ></textarea>
          </div>
        </div>
        <hr>
        <h1 class="text-3xl font-bold mb-8 text-center">Lista de Espera</h1>
        <button
        type="submit"
        disabled={!date || preferredTimes.length === 0}
        class="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
        Unirse a la lista de espera
      </button>
    </form>
  </div>
</div>

<button class="bg-slate-700 text-white" on:click={ ()=> goto('/reservations/tables') }> Mesas </button>

{#if showToast}
  <ToastComplete message='Te hemos añadido a la lista de espera. Te contactaremos si hay una cancelación.' type='success' duration={3000} {onClose} />
{/if}

<hr><hr>
<hr>
<hr>
<Manage /> 