import { Order } from "../models/order";

export const get = async (customFetch = fetch) => {
    const response = await customFetch('/api/order');
    const order = await response.json();
    return order.Pedidos;
}

export const search = async (id: string) => {
    const response = await fetch(`/api/order/${id}`);
    const order = await response.json();
    return order as Order;
}