import { MenuCategory } from "../models/menu";

export const get = async (customFetch = fetch) => {
    const response = await customFetch('/api/menu/category');
    const menuCategory = await response.json();
    return menuCategory.menuCategories;
}

export const search = async (id: string) => {
    const response = await fetch(`/api/menu/category/${id}`);
    const menuCategory = await response.json();
    return menuCategory as MenuCategory;
}
