export const statusPlus:any = (status: string) =>{
    if (status == 'pending') return status = 'preparing'
    if (status == 'preparing') return status = 'ready'
    if (status == 'ready') return status = 'completed'
    if (status == 'completed') return status = 'completed'
}

const statusPlusBackend = (currentStatus: string): string => {
    const statusOrder = ['pending', 'preparing', 'ready', 'completed'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    if (currentIndex === -1 || currentIndex === statusOrder.length - 1) {
        return currentStatus; // Si el estado actual no se encuentra o ya es el último, no cambiar
    }
    return statusOrder[currentIndex + 1]; // Devuelve el siguiente estado
};
