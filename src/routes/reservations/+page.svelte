<script lang="ts">
  import { reservationStore } from "$lib/common/stores/reservations";
  import Manage from "$lib/client/components/reservations/Manage.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { tables } from "$lib/common/stores/tables";
  import FormAddReservation from "$lib/client/components/reservations/FormAddReservation.svelte";


  onMount(async () => {
    await reservationStore.getReservations();
    await tables.get();
  });

  const entryList = {
    date: "",
    preferredTimes: [],
    guests : 2,
    name : "",
    email : "",
    phone : "",
    notes : ""
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
  </div>
</div>

<button
  class="bg-slate-700 text-white"
  on:click={() => goto("/reservations/tables")}
>
  Mesas
</button>

<hr />
<hr />
<hr />
<hr />
<Manage />
