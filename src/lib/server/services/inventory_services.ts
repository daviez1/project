import * as InventoryItemTypes from '$lib/types/inventory';
import { dbConnect } from "../config/db";
import InventoryItem from "$lib/common/Schemas/InventoryItem";
import MenuItem from '$lib/common/Schemas/MenuItem';
import MenuCategory from '$lib/common/Schemas/MenuCategory';

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


export const createInventoryItem = async (inventoryItem: InventoryItemTypes.InventoryItem) => {
    try {
        await InventoryItem.insertMany(inventoryItem);
        //const { id, name, description, price, image, category, available } = inventoryItem;
        //const menuItem = await MenuItem.create({ id, name, description, price, image, category, available });
        //const menuCategory = { id: category, name: category.toLowerCase(), menuItems: [menuItem._id] }; // Usar menuItem._id
        //await MenuCategory.create(menuCategory);
    } catch (error: any) {
        console.log(`error: ${error}`);
        throw new Error('Error al crear el producto en el inventario');
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