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
    const kiskoCategories = await KioskoCategory.find().populate('items')
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

export const createKioskoCategory = async (kioskoCategory: KioskoTypes.KioskoCategory) => {
    try {
        const categoryExist = await KioskoCategory.findOne({ id: kioskoCategory.id });
        if (categoryExist) {
            throw new Error("Ya existe la categoria");
        }

        const itemIds = [];
        for (const newItem of kioskoCategory.items) {
            let item = await KioskoItem.findOne({ id: newItem.id });
            if (!item) {
                item = await KioskoItem.create(newItem);
            }
            itemIds.push(item._id);
        }

        const newKioskoCategory = await KioskoCategory.create({
            ...kioskoCategory,
            items: itemIds
        });

        return await newKioskoCategory.populate('items');
    } catch (error: any) {
        console.log(`error: ${error}`);
        throw new Error('Error al crear la categoria del plato');
    }
};
