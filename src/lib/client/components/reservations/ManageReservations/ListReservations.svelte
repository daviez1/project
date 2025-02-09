<script lang="ts">
  import { onMount } from "svelte";
  import { reservationStore } from "$lib/common/stores/reservations";
  import type { TableReservationFromAPI } from "$lib/types/reservation";

  let reservations: TableReservationFromAPI[] = [];

  onMount(async () => {
    reservations = await reservationStore.getReservations();
    reservations.sort(
      (a, b) =>
        new Date(a.waitlistId?.date).getTime() -
        new Date(b.waitlistId?.date).getTime()
    );
  });
</script>

<div class="my-20 lg:container mx-auto px-4 sm:px-6 lg:px-8">
  <div class="overflow-x-auto">
    <table class="divide-y min-w-full divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >Nombre</th
          >
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >Fecha</th
          >
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >Hora de Inicio</th
          >
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >Comensales</th
          >
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >Email</th
          >
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >Mesa</th
          >
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        {#each reservations as reservation}
          {#if reservation.waitlistId}
            <tr>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >{reservation.waitlistId.name}</td
              >
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >{new Date(reservation.waitlistId.date).toISOString().split('T')[0]}</td
              >
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >{reservation.startTime}</td
              >
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >{reservation.waitlistId.guests}</td
              >
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >{reservation.waitlistId.email}</td
              >
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >{reservation.tableId
                  .map((table) => table.number)
                  .join(", ")}</td
              >
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  </div>
</div>
