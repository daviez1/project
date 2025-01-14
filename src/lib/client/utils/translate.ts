export const translateStatusBtn:any = (status: string) =>{
    if (status == 'pending') return status = 'Pendiente'
    if (status == 'preparing') return status = 'Preparar'
    if (status == 'ready') return status = 'Listo'
    if (status == 'completed') return status = 'Entregar'
}
export const translateStatusSpan:any = (status: string) =>{
    if (status == 'pending') return status = 'Pendiente'
    if (status == 'preparing') return status = 'Preparando'
    if (status == 'ready') return status = 'En camino🚚'
    if (status == 'completed') return status = 'Entregado!!!'
}