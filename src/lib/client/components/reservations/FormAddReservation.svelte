<script lang="ts">
  import { reservationSettings } from "$lib/common/data/reservationSettings";
  import { reservationStore } from "$lib/common/stores/reservations";
  import { tables } from "$lib/common/stores/tables";
  import { waitlist } from "$lib/common/stores/waitlist";
  import type { WaitlistEntry } from "$lib/types/reservation";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import ToastComplete from "../notifications/ToastComplete.svelte";

  export let entryList;
  let message = ''

  onMount(async () => {
    await reservationStore.getReservations();
    await tables.get();
  });

  let showToast = false;
  const showModal = writable(false);

  let { date, email, guests, name, notes, phone, preferredTimes } = entryList;

  const timeSlots = [
    ...reservationSettings.serviceTimes.lunch.map((slot) => slot.time),
    ...reservationSettings.serviceTimes.dinner.map((slot) => slot.time),
  ];

  async function handleSubmit() {
    let tablesAvailable = await tables.getAvailable();
    if (!date || preferredTimes.length === 0) return;

      // Extrae la fecha y la hora
  const selectedDate = new Date(date);
  const selectedTime = preferredTimes[0];

  // Combina la fecha y la hora
  const [hours, minutes] = selectedTime.split(':').map(Number);
  selectedDate.setHours(hours, minutes);

  const entry: WaitlistEntry = {
    id: "",
    date: selectedDate, // Usa la fecha y hora combinadas
    preferredTimes,
    guests,
    name,
    email,
    phone,
    notes,
    status: "waiting",
    createdAt: new Date(),
  };

    if (tablesAvailable.length === 0) {
      showModal.set(true);
      waitlist.add(entry);
      // Reset form
      preferredTimes = [];
      notes = "";
      name = "";
      email = "";
      phone = "";
      return;
    }
    waitlist.add(entry);

    const waitlistDB: WaitlistEntry[] = await waitlist.getWaitlistEntries();
    const waitlistId = waitlistDB.reverse()[0]?._id

    if (!waitlistId || !tablesAvailable[0]?._id) 
    return console.error('No se pudo obtener la entrada de la lista de espera o la mesa disponible.');

    showToast = true;
    message = 'Reserva confirmada. Te esperamos en Hanoi!!.'

    // Reset form
    preferredTimes = [];
    notes = "";
    name = "";
    email = "";
    phone = "";
  }

  const onClose = () => (showToast = false);

  function handleModalConfirm() {
    showModal.set(false);
    showToast = true;
    message = 'Te hemos añadido a la lista de espera. Te contactaremos si hay una cancelación.'
  }

  async function handleModalCancel() {
    const waitlistDB: WaitlistEntry[] = await waitlist.getWaitlistEntries();
    const waitlistId = waitlistDB.reverse()[0]?._id 
    if (!waitlistId) return console.error('No se pudo obtener la entrada de la lista de espera.');
    waitlist.remove(waitlistId);
    showModal.set(false);
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label for="date" class="block text-sm font-medium text-gray-700"
        >Fecha deseada</label
      >
      <input
        id="date"
        type="date"
        bind:value={date}
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <div>
      <label for="hours" class="block text-sm font-medium text-gray-700"
        >Horarios preferidos</label
      >
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
      <label for="number" class="block text-sm font-medium text-gray-700"
        >Número de comensales</label
      >
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
      <label for="fullName" class="block text-sm font-medium text-gray-700"
        >Nombre completo</label
      >
      <input
        id="fullName"
        type="text"
        bind:value={name}
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <div>
      <label for="email" class="block text-sm font-medium text-gray-700"
        >Email</label
      >
      <input
        id="email"
        type="email"
        bind:value={email}
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <div>
      <label for="phoneNumber" class="block text-sm font-medium text-gray-700"
        >Teléfono</label
      >
      <input
        id="phoneNumber"
        type="tel"
        bind:value={phone}
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
      />
    </div>

    <div class="md:col-span-2">
      <label for="notes" class="block text-sm font-medium text-gray-700"
        >Notas adicionales</label
      >
      <textarea
        id="notes"
        bind:value={notes}
        rows="3"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
      ></textarea>
    </div>
  </div>
  <!-- <hr /> -->
  <!-- <h1 class="text-3xl font-bold mb-8 text-center">Lista de Espera</h1> -->
  <button
    type="submit"
    disabled={!date || preferredTimes.length === 0}
    class="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Reservar
    <!-- Unirse a la lista de espera -->
  </button>
</form>

{#if showToast}
  <ToastComplete
    {message}
    type="success"
    duration={3000}
    {onClose}
  />
{/if}

{#if $showModal}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-xl font-bold mb-4">Usted ha sido añadido a la lista de espera, ¿está de acuerdo?</h2>
      <div class="flex justify-end space-x-4">
        <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={ handleModalConfirm }>De acuerdo</button>
        <button class="bg-gray-500 text-white px-4 py-2 rounded" on:click={ handleModalCancel }>No</button>
      </div>
    </div>
  </div>
{/if}