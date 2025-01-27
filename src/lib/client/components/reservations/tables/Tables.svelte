<script lang="ts">
  import { tables } from "$lib/common/stores/tables";
  import type { Table } from "$lib/types/reservation";
  import { onMount } from "svelte";
  import FormAddTable from "./FormAddTable.svelte";
  import FormEditTable from "./FormEditTable.svelte";

  onMount(() => {
    tables.get();
  });

  let editingTable: Table | null = null;
  let showAddForm = false;
  let showEditForm = false;
  let newTable: Table = {
    id: "",
    number: $tables.length + 1,
    available: true,
    capacity: 4,
    section: "indoor",
  };

  const handleEdit = (table: Table) => {
    (editingTable = { ...table });
    showEditForm = true;
  }

  function handleSave() {
    if (editingTable) {
      if (editingTable._id) {
        tables.update( editingTable._id, editingTable);
        editingTable = null;
      }else{ console.log(' No existe esa mesa ');
       }
    }
  }

  function handleAdd() {
    tables.add(newTable);
    newTable = {
      id: "",
      number: $tables.length + 1,
      available: true,
      capacity: 0,
      section: "indoor",
    };
    showAddForm = false;
  }
</script>

<div class="container mx-auto px-4 py-8">
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-2xl font-bold">Gestión de Mesas</h1>
    <button
      class="bg-gray-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-gray-700"
      on:click={() => (showAddForm = true)}
    >
      Añadir Mesa
    </button>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {#each $tables as table (table.id)}
      <div class="bg-white rounded-lg shadow-md p-4">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="font-semibold">Mesa {table.number}</h3>
            <p class="text-sm text-gray-600">
              {table.section === "indoor" ? "interior" : "exterior"} - {table.capacity}
              personas
            </p>
          </div>
          <span
            class="px-2 py-1 rounded-full text-sm
              {table.available
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'}"
          >
            {table.available ? "Disponible" : "No Disponible"}
          </span>
        </div>

        <div class="mt-4 flex justify-between">
          <button
            on:click={() => table._id && tables.toggleAvailable(table._id)}
            class="text-sm rounded-md border border-gray-300 px-3 py-1"
          >
            {table.available ? "Marcar No Disponible" : "Marcar Disponible"}
          </button>

          <button
            on:click={() => handleEdit(table)}
            class="text-gray-600 hover:text-gray-700"
          >
            Editar
          </button>
        </div>
      </div>
    {/each}
  </div>

  {#if showAddForm}
    <FormAddTable {newTable} {handleAdd} {showAddForm} />
  {/if}

  {#if showEditForm && editingTable}
    <FormEditTable {editingTable} {handleSave} {showEditForm} />
  {/if}
</div>
