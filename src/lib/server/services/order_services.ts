import MenuItem from "$lib/common/Schemas/MenuItem";
import Order from "$lib/common/Schemas/Order"
import OrderItem from "$lib/common/Schemas/OrderItem"
import { dbConnect } from "../config/db"

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

export const getOrderItem = async () => {
    try {
        await dbConnect();
        const orderItems = await OrderItem.find().lean().exec();

        // Obtener los nombres de los MenuItems
        for (let item of orderItems) {
            const menuItem = await MenuItem.findOne({ id: item.menuItemId }).exec();
            if (menuItem) {
                item.name = menuItem.name;
            }
        }

        console.log(orderItems);
        return orderItems;
    } catch (error) {
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