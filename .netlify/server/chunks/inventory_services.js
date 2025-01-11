import "mongoose";
import { d as dbConnect } from "./db.js";
import { I as InventoryItem } from "./InventoryItem.js";
import { M as MenuItem } from "./MenuItem.js";
import { M as MenuCategory } from "./MenuCategory.js";
import { K as KioskoItem, a as KioskoCategory } from "./KioskoCategory.js";
import { c as capitalize } from "./capitalize.js";
await dbConnect();
const handleCategoryCreation = async (item, Model, CategoryModel) => {
  const itemExist = await Model.findOne({ name: item.name });
  if (itemExist) {
    throw new Error(`Ya existe ese Producto del ${item.type}`);
  }
  const newItem = await Model.create(item);
  const categoryExist = await CategoryModel.findOne({ id: newItem.category });
  if (!categoryExist) {
    await CategoryModel.create({
      id: newItem.category,
      name: capitalize(newItem.category),
      items: [newItem._id]
    });
  } else {
    await CategoryModel.findOneAndUpdate(
      { id: newItem.category },
      { $push: { items: newItem._id } },
      { new: true }
    ).populate("items");
  }
};
const getInventoryItem = async () => {
  try {
    await dbConnect();
    const inventoryItems = await InventoryItem.find();
    return inventoryItems;
  } catch (error) {
    console.log(`error: ${error}`);
    throw new Error("Error al obtener los productos del inventario");
  }
};
const createInventoryItem = async (inventoryItem) => {
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
    if (inventoryItem.type === "menu") {
      await handleCategoryCreation(item, MenuItem, MenuCategory);
    } else if (inventoryItem.type === "kiosk") {
      await handleCategoryCreation(item, KioskoItem, KioskoCategory);
    }
    const categoryInventoryExist = await InventoryItem.findOne({ name: item.name });
    if (!categoryInventoryExist) {
      const newInventoryItem = await InventoryItem.create(inventoryItem);
      return newInventoryItem;
    } else {
      throw new Error(`Ya existe el producto ${item.name} en el inventario`);
    }
  } catch (error) {
    console.log(`error: ${error}`);
    throw new Error("Error al crear el producto en el inventario");
  }
};
const deleteInventoryItem = async (id) => {
  await InventoryItem.findByIdAndDelete(id);
};
export {
  createInventoryItem as c,
  deleteInventoryItem as d,
  getInventoryItem as g
};
