import MenuItem from "$lib/common/Schemas/MenuItem";
import Order from "$lib/common/Schemas/Order"
import OrderItem from "$lib/common/Schemas/OrderItem"
import { dbConnect } from "../config/db"
import * as OrderTypes from '$lib/types/order'
import mongoose from "mongoose";
import { statusPlus } from "$lib/client/utils/statusPlus";

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
        const order:OrderTypes.Order|null = await Order.findById(orderId);
        if (!order) {
            throw new Error('Pedido no encontrado');
        }
        if(order.status !== 'completed'){
            order.status = statusPlus(order.status)
            order.createdAt = new Date()
            await (order as unknown as mongoose.Document).save()
            return order
        }else throw new Error('Ya se completó el pedido')
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
