import * as KioskoTypes from "$lib/types/kiosko";
import KioskoCategory from "$lib/common/Schemas/KioskoCategory";
import KioskoItem from "$lib/common/Schemas/KioskoItem";
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

export const getInventoryCategories = async (): Promise<KioskoTypes.KioskoCategory[]> => {
try{   
    await dbConnect()
    const kiskoCategories = await KioskoCategory.find()
    return kiskoCategories;
} catch (error:any) {
    console.log(`error: ${error}`)
    throw new Error('Error al obtener la categoria del producto en el kiosko')
}
}

export const createInventoryItem = async ( kioskoItem: KioskoTypes.KioskoItem ) => {
    try {
        await KioskoItem.insertMany(kioskoItem);
    } catch (error:any) {
        console.log(`error: ${error}`)
        throw new Error('Error al crear el plato')
    }
};

export const getInventoryCategoryById = async ( id:string ) => {
    try {
        await dbConnect()
        const kioskoCategory = await KioskoCategory.findById(id)
        return kioskoCategory;
    } catch (error:any) {
        console.log(`error: ${error}`)
        throw new Error('Error al obtener la categoria')
    }
};