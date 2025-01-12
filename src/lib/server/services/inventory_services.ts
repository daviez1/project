import * as InventoryItemTypes from '$lib/types/inventory';
import { dbConnect } from "../config/db";
import InventoryItem from "$lib/common/Schemas/InventoryItem";
import MenuItem from '$lib/common/Schemas/MenuItem';
import MenuCategory from '$lib/common/Schemas/MenuCategory';
import KioskoItem from '$lib/common/Schemas/KioskoItem';
import KioskoCategory from '$lib/common/Schemas/KioskoCategory';
import { handleCategoryCreation } from '../../../../hooks.server';
import mongoose from 'mongoose';

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
            id: inventoryItem.id, 
            name: inventoryItem.name, 
            description: inventoryItem.description, 
            price: inventoryItem.price, 
            available: inventoryItem.available, 
            image: inventoryItem.image, 
            category: inventoryItem.category,
            type: inventoryItem.type
        };

        if (inventoryItem.type === 'menu') {
            await handleCategoryCreation(item, MenuItem, MenuCategory);
        } else if (inventoryItem.type === 'kiosk') {
            await handleCategoryCreation(item, KioskoItem, KioskoCategory);
        }
        const categoryInventoryExist = await InventoryItem.findOne({ name: item.name });
        if (!categoryInventoryExist) {
            const newInventoryItem = await InventoryItem.create(inventoryItem);
            return newInventoryItem;
        }else{
            throw new Error(`Ya existe el producto ${item.name} en el inventario`)
        }

    } catch (error: any) {
        console.log(`error: ${error}`);
        throw new Error('Error al crear el producto en el inventario');
    }
};

export const deleteInventoryItem = async( category:string ) =>{
    await MenuItem.deleteMany( { category } )
    await MenuCategory.findOneAndDelete( { id: category } ) 
    return await InventoryItem.findOneAndDelete({category})
}