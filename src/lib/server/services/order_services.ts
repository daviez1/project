import MenuItem from "$lib/common/Schemas/MenuItem";
import Order from "$lib/common/Schemas/Order"
import OrderItem from "$lib/common/Schemas/OrderItem"
import { dbConnect } from "../config/db"
import * as OrderTypes from '$lib/types/order'
import mongoose from "mongoose";
import { statusPlus, statusPlusBackend } from "$lib/client/utils/statusPlus";

export const getOrder = async () => {
    try {
        await dbConnect();
        const orders = await Order.find()
        return orders;
    } catch (error) {
        throw new Error(`Error al obtener pedidos: ${error}`);
    }
};

export const getOrderItem = async ( id:string | undefined ) => {
    try {
        await dbConnect();
        const orderItem = await OrderItem.findOne({menuItemId: id})
        return orderItem;}
    catch(error){
        throw new Error(`Error al obtener pedidos: ${error}`);
    }    

    
};

export const updateOrderStatusBackend = async (orderId: mongoose.Types.ObjectId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(orderId)) throw new Error('Invalid orderId');

        const order = await Order.findById(orderId);
        if (!order) throw new Error('Order not found');

        const newStatus = statusPlusBackend(order.status); // Calcula el nuevo estado basado en el estado actual

        const orderUpdated = await Order.findByIdAndUpdate(
            orderId, 
            { status: newStatus, updatedAt: new Date()}, 
            { new: true } // Para devolver el documento actualizado
        );

        if (!orderUpdated) throw new Error('Order not found');

        await orderUpdated.save();
        return orderUpdated;
    } catch (error) {
        console.error('Error al actualizar el estado del pedido:', error);
        throw new Error('Error al actualizar el estado del pedido');
    }
};

export async function createOrder(order: OrderTypes.Order): Promise<OrderTypes.Order> {
    try {
        const newOrder = await Order.create(order);
        return newOrder;
    } catch (error) {
        throw new Error('Error al crear el pedido');
    }
}
