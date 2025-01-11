import { M as MenuCategory } from "./MenuCategory.js";
import { M as MenuItem } from "./MenuItem.js";
import { d as dbConnect } from "./db.js";
const getMenuItems = async () => {
  try {
    await dbConnect();
    const menuItems = await MenuItem.find();
    return menuItems;
  } catch (error) {
    console.log(`error: ${error}`);
    throw new Error("Error al obtener los platos");
  }
};
const getMenuItemById = async (id) => {
  try {
    await dbConnect();
    const menuItem = await MenuItem.findOne({ id });
    return menuItem;
  } catch (error) {
    console.log(`error: ${error}`);
    throw new Error("Error al obtener el plato");
  }
};
const createMenuCategory = async (menuCategory) => {
  try {
    const categoryExist = await MenuCategory.findOne({ id: menuCategory.id });
    if (categoryExist) {
      throw new Error("Ya existe la categoria");
    }
    const itemIds = [];
    for (const newItem of menuCategory.items) {
      let item = await MenuItem.findOne({ id: newItem.id });
      if (!item) {
        item = await MenuItem.create(newItem);
      }
      itemIds.push(item._id);
    }
    const newKioskoCategory = await MenuCategory.create({
      ...menuCategory,
      items: itemIds
    });
    return await newKioskoCategory.populate("items");
  } catch (error) {
    console.log(`error: ${error}`);
    throw new Error("Error al crear la categoria del plato");
  }
};
const getMenuCategory = async () => {
  try {
    await dbConnect();
    const menuCategories = await MenuCategory.find().populate("items");
    return menuCategories;
  } catch (error) {
    console.log(`error: ${error}`);
    throw new Error("Error al obtener las categorias");
  }
};
const getMenuCategoryById = async (id) => {
  try {
    await dbConnect();
    const menuCategory = await MenuCategory.findById(id);
    return menuCategory;
  } catch (error) {
    console.log(`error: ${error}`);
    throw new Error("Error al obtener la categoria");
  }
};
export {
  getMenuCategory as a,
  getMenuCategoryById as b,
  createMenuCategory as c,
  getMenuItemById as d,
  getMenuItems as g
};
