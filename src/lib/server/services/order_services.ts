import MenuItem from "$lib/common/Schemas/MenuItem";
import Order from "$lib/common/Schemas/Order"
import OrderItem from "$lib/common/Schemas/OrderItem"
import { dbConnect } from "../config/db"
import * as OrderTypes from '$lib/types/order'
import mongoose from "mongoose";
import { statusPlus } from "$lib/client/utils/statusPlus";
import { translateStatus } from "$lib/client/utils/translate";

// export const getOrder = async () => {
//     try {
//         await dbConnect();
//         const orders = await Order.find().lean().exec();

//         // Obtener los nombres de los MenuItems
//         for (let order of orders) {
//             for (let item of order.items) {
//                 const menuItem = await MenuItem.findOne({ id: item.id });
//                 if (menuItem) {
//                     item.name = menuItem.name;
//                 }
//             }
//         }

//         console.log(orders[0].items);
//         return orders;
//     } catch (error) {
//         throw new Error(`Error al obtener pedidos: ${error}`);
//     }
// };

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
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error('Pedido no encontrado');
        }
        const newStatus = statusPlus(order.status);
        const toUpdate = await Order.findByIdAndUpdate(orderId, { status: newStatus }, { new: true });
        return toUpdate;
    } catch (error) {
        console.error('Error al actualizar el estado del pedido:', error);
        throw new Error('Error al actualizar el estado del pedido');
    }
};


// export const getOrderItem = async() =>{
//     try {
//         await dbConnect()
//         const orderItem = await OrderItem.find().populate('')
//         return orderItem
//     } catch (error) {
//         throw new Error(`Error al obtener pedidos: ${error}`)
//     }
// }

// src/lib/server/services/order_services.ts

export async function createOrder(order: OrderTypes.Order): Promise<OrderTypes.Order> {
    try {
        const newOrder = await Order.create(order);
        return newOrder;
    } catch (error) {
        throw new Error('Error al crear el pedido');
    }
}
