import { K as KioskoItem, a as KioskoCategory } from "./KioskoCategory.js";
import { d as dbConnect } from "./db.js";
const getKioskoItem = async () => {
  try {
    await dbConnect();
    const kioskoItems = await KioskoItem.find();
    return kioskoItems;
  } catch (error) {
    console.log(`error: ${error}`);
    throw new Error("Error al obtener el producto");
  }
};
const getKioskoItemById = async (id) => {
  try {
    await dbConnect();
    const kioskoItem = await KioskoItem.findById(id);
    return kioskoItem;
  } catch (error) {
    console.log(`error: ${error}`);
    throw new Error("Error al obtener el producto");
  }
};
const getKioskoCategories = async () => {
  try {
    await dbConnect();
    const kiskoCategories = await KioskoCategory.find().populate("items");
    return kiskoCategories;
  } catch (error) {
    console.log(`error: ${error}`);
    throw new Error("Error al obtener la categoria del producto en el kiosko");
  }
};
const getKioskoCategoryById = async (id) => {
  try {
    await dbConnect();
    const kioskoCategory = await KioskoCategory.findById(id);
    return kioskoCategory;
  } catch (error) {
    console.log(`error: ${error}`);
    throw new Error("Error al obtener la categoria");
  }
};
const createKioskoCategory = async (kioskoCategory) => {
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
    return await newKioskoCategory.populate("items");
  } catch (error) {
    console.log(`error: ${error}`);
    throw new Error("Error al crear la categoria del plato");
  }
};
export {
  getKioskoCategories as a,
  getKioskoCategoryById as b,
  createKioskoCategory as c,
  getKioskoItemById as d,
  getKioskoItem as g
};
