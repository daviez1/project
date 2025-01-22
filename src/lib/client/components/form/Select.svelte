<script lang="ts">
  export let filterType: 'todos' | 'menu' | 'kiosk' = 'todos';
  export let handleChange: (event: any) => void;
</script>

<div class="flex space-x-1 rounded-xl select-none mt-0 md:mt-6 border-2 border-gray-400 p-1">
  <label class="radio flex flex-grow items-center justify-center rounded-lg px-1 cursor-pointer md:px-2">
    <input
      type="radio"
      name="radio"
      value="todos"
      class="peer hidden"
      checked={filterType === 'todos'}
      on:change={handleChange}
    />
    <span
      class="text-xs md:text-base lg:text-md font-bold peer-checked:bg-gradient-to-r peer-checked:from-gray-500 peer-checked:to-gray-700 peer-checked:text-white text-gray-700 p-1 md:p-2 rounded-lg transition duration-150 ease-in-out"
    >
      Todos
    </span>
  </label>

  <label class="radio flex flex-grow items-center justify-center rounded-lg px-1 cursor-pointer md:px-2">
    <input
      type="radio"
      name="radio"
      value="menu"
      class="peer hidden"
      checked={filterType === 'menu'}
      on:change={handleChange}
    />
    <span
      class="text-xs md:text-base lg:text-md font-bold peer-checked:bg-gradient-to-r peer-checked:from-gray-500 peer-checked:to-gray-700 peer-checked:text-white text-gray-700 p-1 md:p-2 rounded-lg transition duration-150 ease-in-out"
    >
      Restaurante
    </span>
  </label>

  <label class="radio flex flex-grow items-center justify-center rounded-lg px-1 cursor-pointer md:px-2">
    <input
      type="radio"
      name="radio"
      value="kiosk"
      class="peer hidden"
      checked={filterType === 'kiosk'}
      on:change={handleChange}
    />
    <span
      class="text-xs md:text-base lg:text-md font-bold peer-checked:bg-gradient-to-r peer-checked:from-gray-500 peer-checked:to-gray-700 peer-checked:text-white text-gray-700 p-1 md:p-2 rounded-lg transition duration-150 ease-in-out"
    >
      Kiosko
    </span>
  </label>
</div>
