export const translateStatus:any = (status: string) =>{
    if (status == 'pending') return status = 'pendiente'
    if (status == 'preparing') return status = 'preparando'
    if (status == 'ready') return status = 'listo'
    if (status == 'completed') return status = 'completado'
}