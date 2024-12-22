import * as KioskoTypes from "$lib/types/kiosko";
import KioskoCategory from "$lib/common/Schemas/KioskoCategory";
import KioskoItem from "$lib/common/Schemas/KioskoItem";
import { dbConnect } from "../config/db";

export const getKioskoItem = async () => {
try{   
    await dbConnect()
    const kioskoItems = await KioskoItem.find()
    return kioskoItems;
} catch (error:any) {
    console.log(`error: ${error}`)
    throw new Error('Error al obtener el producto')
}
}

export const getKioskoItemById = async ( id:string ) => {
try{   
    await dbConnect()
    const kioskoItem = await KioskoItem.findById( id )
    return kioskoItem;
} catch (error:any) {
    console.log(`error: ${error}`)
    throw new Error('Error al obtener el producto')
}
}

export const getKioskoCategories = async (): Promise<KioskoTypes.KioskoCategory[]> => {
try{   
    await dbConnect()
    const kiskoCategories = await KioskoCategory.find()
    return kiskoCategories;
} catch (error:any) {
    console.log(`error: ${error}`)
    throw new Error('Error al obtener la categoria del producto en el kiosko')
}
}

export const createKioskoItem = async ( kioskoItem: KioskoTypes.KioskoItem ) => {
    try {
        await KioskoItem.insertMany(kioskoItem);
    } catch (error:any) {
        console.log(`error: ${error}`)
        throw new Error('Error al crear el plato')
    }
};

export const getKioskoCategoryById = async ( id:string ) => {
    try {
        await dbConnect()
        const kioskoCategory = await KioskoCategory.findById(id)
        return kioskoCategory;
    } catch (error:any) {
        console.log(`error: ${error}`)
        throw new Error('Error al obtener la categoria')
    }
};