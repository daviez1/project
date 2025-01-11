export function statusPlus(currentStatus: string): string {
    switch (currentStatus) {
        case 'pending':
            return 'preparing';
        case 'preparing':
            return 'ready';
        case 'ready':
            return 'completed';
        default:
            return 'completed';
    }
}

export const statusPlusBackend = (currentStatus: string): string => {
    const statusOrder = ['pending', 'preparing', 'ready', 'completed'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    if (currentIndex === -1 || currentIndex === statusOrder.length - 1) {
        return currentStatus; // Si el estado actual no se encuentra o ya es el último, no cambiar
    }
    return statusOrder[currentIndex + 1]; // Devuelve el siguiente estado
};
