export const statusPlus:any = (status: string) =>{
    if (status == 'pending') return status = 'preparing'
    if (status == 'preparing') return status = 'ready'
    if (status == 'ready') return status = 'completed'
    if (status == 'completed') return status = 'completed'
}

// export function updateOrderStatus(orderId: string, status: 'pending' | 'preparing' | 'ready' | 'completed') {
//     return orders.updateStatus(orderId, status);
//   }