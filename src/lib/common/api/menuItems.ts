import { MenuItem } from "../models/menu";

export const get = async (customFetch = fetch) => {
    const response = await customFetch('/api/menu');
    const menuItems = await response.json();
    return menuItems.menuItems;
}

export const search = async (id: string) => {
    const response = await fetch(`/api/menu/${id}`);
    const menuItem = await response.json();
    return menuItem as MenuItem;
}
