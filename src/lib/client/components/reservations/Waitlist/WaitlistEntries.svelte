<script lang="ts">
    import { onMount } from "svelte";
    import { reservationStore } from "$lib/common/stores/reservations";
    import type {
      TableReservationFromAPI,
      WaitlistEntry,
    } from "$lib/types/reservation";
    import { waitlist } from "$lib/common/stores/waitlist";
    import { translateStatusSpan } from "$lib/client/utils/translate";
  
    let waitlistEntries: WaitlistEntry[] = [];
  
    onMount(async () => {
      waitlistEntries = await waitlist.getWaitlistEntries();
    });
  </script>
  
  <div class="my-20 container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comensales</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horarios preferidos</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each waitlistEntries.filter(entry=> entry.status !== 'reserved' ) as entry}
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.name}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{translateStatusSpan(entry.status)}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.guests}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(entry.date).toLocaleString()}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.preferredTimes.join(' • ')}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.email}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  