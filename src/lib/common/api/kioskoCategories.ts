import { KioskoCategory } from "../models/kiosko";

export const get = async (customFetch = fetch) => {
    const response = await customFetch('/api/kiosko/category');
    const kioskoCategory = await response.json();
    return kioskoCategory.kioskoCategories;
}

export const search = async (id: string) => {
    const response = await fetch(`/api/kiosko/category/${id}`);
    const kioskoCategory = await response.json();
    return kioskoCategory as KioskoCategory;
}
