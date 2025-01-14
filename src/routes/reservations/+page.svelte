<script lang="ts">
  import { waitlist } from '$lib/common/stores/waitlist';
  import { reservationSettings } from '$lib/common/data/reservationSettings';
  
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
    
    const entry = {
      id: crypto.randomUUID(),
      date: new Date(date),
      preferredTimes,
      guests,
      name,
      email,
      phone,
      notes,
      status: 'waiting' as 'waiting',
      createdAt: new Date()
    };
    
    waitlist.add(entry);
    alert('Te hemos añadido a la lista de espera. Te contactaremos si hay una cancelación.');
    
    // Reset form
    preferredTimes = [];
    notes = '';
  }
</script>

<!-- <div class="container mx-auto px-4 py-12 max-w-4xl">
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
    
    ... rest of the existing reservation form ...
  </div>
</div>-->

<hr>

<div class="container mx-auto px-4 py-28 max-w-4xl">
  <div class="bg-white rounded-lg shadow-lg p-8">
    <h1 class="text-3xl font-bold mb-8 text-center">Reserve su mesa</h1>
    
    <p class="text-gray-600 mb-8 text-center">
      Si no hay disponibilidad para la fecha deseada, únete a nuestra lista de espera.
      Te contactaremos si hay una cancelación.
    </p>
    
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

<hr><hr>
<hr>
<hr>