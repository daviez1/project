import * as InventoryItemTypes from '$lib/types/inventory';
import { dbConnect } from "../config/db";
import InventoryItem from "$lib/common/Schemas/InventoryItem";
import MenuItem from '$lib/common/Schemas/MenuItem';
import MenuCategory from '$lib/common/Schemas/MenuCategory';
import KioskoItem from '$lib/common/Schemas/KioskoItem';
import { capitalize } from '$lib/client/utils/capitalize';
import KioskoCategory from '$lib/common/Schemas/KioskoCategory';
import { handleCategoryCreation } from '../../../../hooks.server';

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
        const item = { 
            id: '12', 
            name: inventoryItem.name, 
            description: inventoryItem.description, 
            price: inventoryItem.price, 
            available: inventoryItem.available, 
            image: inventoryItem.image, 
            category: inventoryItem.category,
            type: inventoryItem.type
        };

        const categoryInventoryExist = await InventoryItem.findOne({ name: item.name });
        if (!categoryInventoryExist) {
            await InventoryItem.insertMany(inventoryItem);
        }else{
            throw new Error(`Ya existe el producto ${item.name} en el inventario`)
        }

        if (inventoryItem.type === 'menu') {
            await handleCategoryCreation(item, MenuItem, MenuCategory);
        } else if (inventoryItem.type === 'kiosk') {
            await handleCategoryCreation(item, KioskoItem, KioskoCategory);
        }

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