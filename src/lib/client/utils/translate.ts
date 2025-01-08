export const translateStatus:any = (status: string) =>{
    if (status == 'pending') return status = 'Pendiente'
    if (status == 'preparing') return status = 'Preparar'
    if (status == 'ready') return status = 'Listo'
    if (status == 'completed') return status = 'Entregar'
}