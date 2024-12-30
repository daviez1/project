import * as InventoryItemTypes from '$lib/types/inventory';
import { dbConnect } from "../config/db";
import InventoryItem from "$lib/common/Schemas/InventoryItem";

export const getInventoryItem = async () => {
try{   
    await dbConnect()
    const inventoryItems = await InventoryItem.find()
    return inventoryItems;
} catch (error:any) {
    console.log(`error: ${error}`)
    throw new Error('Error al obtener los productos del inventario')
}
}

export const getInventoryItemById = async ( id:string ) => {
try{   
    await dbConnect()
    const inventoryItem = await InventoryItem.findById( id )
    return inventoryItem;
} catch (error:any) {
    console.log(`error: ${error}`)
    throw new Error('Error al obtener el producto del inventario')
}
}


export const createInventoryItem = async ( inventoryItem: InventoryItemTypes.InventoryItem ) => {
    try {
        await InventoryItem.insertMany(inventoryItem);
    } catch (error:any) {
        console.log(`error: ${error}`)
        throw new Error('Error al crear el producto en el inventario')
    }
};

// export const getInventoryCategoryById = async ( id:string ) => {
//     try {
//         await dbConnect()
//         const kioskoCategory = await KioskoCategory.findById(id)
//         return kioskoCategory;
//     } catch (error:any) {
//         console.log(`error: ${error}`)
//         throw new Error('Error al obtener la categoria')
//     }
// };