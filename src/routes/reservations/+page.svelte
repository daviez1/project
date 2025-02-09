<script lang="ts">
  import { reservationStore } from "$lib/common/stores/reservations";
  import Manage from "$lib/client/components/reservations/Manage.svelte";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import FormAddReservation from "$lib/client/components/reservations/FormAddReservation.svelte";
  import { tables } from "$lib/common/stores/tables";

  onMount(async () => {
    await reservationStore.getReservations();
    await tables.get();
  });

  const entryList = {
    date: "",
    preferredTimes: [],
    guests: 2,
    name: "",
    email: "",
    phone: "",
    notes: ""
  };

  const showModal = writable(false);

  function handleCancelReservation() {
    showModal.set(true);
  }

  function closeModal() {
    showModal.set(false);
  }
</script>

<svelte:head>
  <title>Reservaciones</title>
</svelte:head>

<div class="container mx-auto px-4 py-28 max-w-4xl">
  <div class="bg-white rounded-lg shadow-lg p-8">
    <h1 class="text-3xl font-bold mb-8 text-center">Reserve su mesa</h1>

    <p class="text-gray-600 mb-8 text-center">
      Si no hay disponibilidad para la fecha deseada, únete a nuestra lista de
      espera. Te contactaremos si hay una cancelación.
    </p>
    <FormAddReservation {entryList} />
    <div class="flex justify-center mt-4">
      <button 
        class="bg-gray-700 text-gray-400 border border-gray-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
        on:click={handleCancelReservation}
        >
        <span class="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
        Cancelar reserva
      </button>
      </div>
  </div>
</div>

{#if $showModal}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
    <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-10/12 sm:w-8/12 relative max-h-[90vh] overflow-y-auto">
      <button
        type="button"
        class="absolute top-2 right-2 size-11 text-3xl text-gray-500 hover:text-gray-700"
        on:click={closeModal}
      >
        &times;
      </button>
      <Manage />
    </div>
  </div>
{/if}

<style>
  .fixed {
    position: fixed;
  }
  .inset-0 {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .overflow-y-auto {
    overflow-y: auto;
  }
  /* .max-h-[90vh] {
    max-height: 90vh;
  } */
</style>
