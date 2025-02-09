<script lang="ts">
  import { cart } from '$lib/common/stores/cart';
  import { orders } from '$lib/common/stores/orders';
  import { createQuery } from '@tanstack/svelte-query';
  import { GetKioskoItems, GetMenuItems } from '$lib/common/constants/queries';
  import * as OrderTypes from "$lib/types/order";
  import ToastComplete from '../notifications/ToastComplete.svelte';
  import { getKioskoItem, getMenuItem } from '$lib/client/utils/getItemsFromCart';
  
  let showToast = false;
  let toastMessage = '';
  let newOrder: OrderTypes.Order = { id: '', items: [], status: 'pending', createdAt: new Date(), updatedAt: new Date(), total: 0 };

  const menuItemsQuery = createQuery({ 
  queryKey: [GetMenuItems], 
  queryFn: async () => await cart.fetchMenuItems()      
});
  const kioskoItemsQuery = createQuery({ 
  queryKey: [GetKioskoItems], 
  queryFn: async () => await cart.fetchKioskoItems()      
});

    $: menuItems = $menuItemsQuery.data || []; 
    $: kioskoItems = $kioskoItemsQuery.data || []; 
    
  $: items = $cart.map(item => ({
    ...item, 
    menuItem: getMenuItem(item.menuItemId, menuItems) ?? getKioskoItem(item.menuItemId,kioskoItems), 
  }));
  
  $: total = items.reduce((sum, item) => sum + (item.menuItem?.price || 0) * item.quantity, 0);

  async function checkout() {
    if (items.length === 0) return;
    newOrder.id = ''
    newOrder.items = items
    newOrder.total = total
    orders.post(newOrder);
    cart.clear();
   
    toastMessage = 'Pedido confirmado!';
    showToast = true;
    setTimeout(() => {
      showToast = false;
    }, 3000);
  }

  const closeToast = () => showToast = false;
</script>

<div class="bg w-full mt-5 rounded-lg shadow-md p-6">
  <h2 class="text-xl md:text-2xl font-bold text-gradient mb-6 text-center">Sus pedidos</h2>
  
  {#if items.length === 0}
    <p class="text-gray-500 text-center py-4">No ha realizado ningún pedido</p>
  {:else}
    <div class="space-y-4 mb-6">
      {#each items as item}
        <div class="flex justify-between items-center">
          <div>
            <h3 class="font-semibold text-md">{item.menuItem?.name}</h3>
            <p class="text-sm text-gray-600">Cantidad: {item.quantity}</p>
          </div>
          <div class="text-right">
            <p class="text-sm md:text-md font-semibold">${((item.menuItem?.price || 0) * item.quantity).toFixed(2)}</p>
            <button
              class="text-sm text-red-600 hover:text-red-700"
              on:click={() => cart.removeItem(item.menuItemId)}
            >
              Cancelar
            </button>
          </div>
        </div>
      {/each}
    </div>
    
    <div class="border-t pt-4">
      <div class="flex justify-between items-center mb-6">
        <span class="text-sm md:text-lg font-bold">Total:</span>
        <span class="text-sm md:text-lg font-bold">${total.toFixed(2)}</span>
      </div>
      <div class="flex justify-center">
        <button
          on:click={checkout}
          class="w-fit px-4 md:p-0 md:w-full bg-gray-600 text-white py-1 md:py-3 rounded-lg font-semibold hover:bg-gray-700"
        >
          Confirmar
        </button>
      </div>  
    </div>
  {/if}
  {#if showToast}
    <ToastComplete type={'success'} message={toastMessage} onClose={closeToast} />
  {/if}
</div>
<style>
  .bg{
    background-image: radial-gradient(circle at 51% 29%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 3%,transparent 3%, transparent 100%),radial-gradient(circle at 95% 73%, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.03) 3%,transparent 3%, transparent 100%),radial-gradient(circle at 66% 49%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 3%,transparent 3%, transparent 100%),radial-gradient(circle at 89% 3%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 3%,transparent 3%, transparent 100%),radial-gradient(circle at 84% 66%, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.01) 3%,transparent 3%, transparent 100%),radial-gradient(circle at 85% 96%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 26% 14%, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.01) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 59% 13%, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.03) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 21% 44%, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.01) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 9% 11%, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.01) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 70% 60%, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.01) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 27% 19%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 33% 2%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 91% 36%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 5%,transparent 5%, transparent 100%),radial-gradient(circle at 100% 8%, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.01) 5%,transparent 5%, transparent 100%),radial-gradient(circle at 87% 65%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 5%,transparent 5%, transparent 100%),radial-gradient(circle at 36% 37%, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.03) 5%,transparent 5%, transparent 100%),radial-gradient(circle at 89% 79%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 5%,transparent 5%, transparent 100%),linear-gradient(90deg, hsla(245,0%,100%,1),hsla(230,0%,100%,1));
  }
</style>