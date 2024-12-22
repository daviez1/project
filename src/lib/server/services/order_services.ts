import MenuItem from "$lib/common/Schemas/MenuItem";
import Order from "$lib/common/Schemas/Order"
import OrderItem from "$lib/common/Schemas/OrderItem"
import { dbConnect } from "../config/db"
import * as OrderTypes from '$lib/types/order'

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
