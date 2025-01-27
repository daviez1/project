<script lang="ts">
  import type{ Table } from "$lib/types/reservation";

    export let editingTable: Table
    export let handleSave
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <h2 class="text-xl font-bold mb-4">Editar Mesa {editingTable.number}</h2>

      <div class="space-y-4">
        <div>
          <label for="number" class="block text-sm font-medium text-gray-700">Número</label>
          <input
            id="number"
            type="number"
            bind:value={editingTable.number}
            class="mt-1 block w-full rounded-md border-gray-300"
          />
        </div>

        <div>
          <label for="capacity" class="block text-sm font-medium text-gray-700">Capacidad</label>
          <input
            id="capacity"
            type="number"
            bind:value={editingTable.capacity}
            class="mt-1 block w-full rounded-md border-gray-300"
          />
        </div>

        <div>
          <label for="section" class="block text-sm font-medium text-gray-700">Sección</label>
          <select id="section" bind:value={editingTable.section} class="mt-1 block w-full border-b-2 border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 text-sm md:text-lg">
            <option value="indoor">Interior</option>
            <option value="outdoor">Exterior</option>
          </select>
        </div>

        <div>
          <label for="available" class="block text-sm font-medium text-gray-700">Disponibilidad</label>
          <div class="mt-1">
            <label class="inline-flex items-center">
              <input
                id="available"
                type="checkbox"
                bind:checked={editingTable.available}
                class="rounded text-gray-600"
              />
              <span class="ml-2">Disponible</span>
            </label>
          </div>
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-4">
        <button
          on:click={() => editingTable = null}
          class="text-gray-600 hover:text-gray-700"
        >
          Cancelar
        </button>
        <button
          on:click={handleSave}
          class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>