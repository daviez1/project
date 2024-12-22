import * as TypesMenu from '$lib/common/models/menu';
import MenuCategory from '$lib/common/Schemas/MenuCategory';
import MenuItem from '$lib/common/Schemas/MenuItem';
import { dbConnect } from '../config/db';
import { menuCategories } from '../../common/data/menu';

export const getMenuItems = async () => {
    try {
        await dbConnect()
        const menuItems = await MenuItem.find();
        return menuItems;
    } catch (error:any) {
        console.log(`error: ${error}`)
        throw new Error('Error al obtener los platos')
    }
};

export const getMenuItemById = async ( id: string | undefined):Promise<TypesMenu.MenuItem> => {
    try {
        await dbConnect()
        const menuItem = await MenuItem.findOne( {id} );
        return menuItem;
    } catch (error:any) {
        console.log(`error: ${error}`)
        throw new Error('Error al obtener el plato')
    }
};

export const deleteMenuItemById = async ( id: string | undefined) => {
    try {
        const menuItem = await MenuItem.findByIdAndDelete( id );
        return menuItem;
    } catch (error:any) {
        console.log(`error: ${error}`)
        throw new Error('Error al eliminar el plato')
    }
};

export const createMenuItem = async ( menuItem: TypesMenu.MenuItem ) => {
    try {
        await MenuItem.create(menuItem);
    } catch (error:any) {
        console.log(`error: ${error}`)
        throw new Error('Error al crear el plato')
    }
};

export const getMenuCategory = async () => {
    try {
        await dbConnect()
        const menuCategories = await MenuCategory.find()
        return menuCategories;
    } catch (error:any) {
        console.log(`error: ${error}`)
        throw new Error('Error al obtener las categorias')
    }
};

export const getMenuCategoryById = async ( id:string ) => {
    try {
        await dbConnect()
        const menuCategory = await MenuCategory.findById(id)
        return menuCategory;
    } catch (error:any) {
        console.log(`error: ${error}`)
        throw new Error('Error al obtener la categoria')
    }
};