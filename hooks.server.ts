import type { Handle } from '@sveltejs/kit';
import { dbConnect } from './src/lib/server/config/db';
import { capitalize } from './src/lib/client/utils/capitalize';

await dbConnect();

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);
  return response;
};

export const handleCategoryCreation = async (item: any, Model:any, CategoryModel:any) => {
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
      ).populate('items');
  }
};
