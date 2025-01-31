import { error, type Handle } from '@sveltejs/kit';
import { dbConnect } from './lib/server/config/db';
import { capitalize } from './lib/client/utils/capitalize';

await dbConnect();

const allowedIPs:string[] = [];

export const handle: Handle = async ({ event, resolve }) => {
    const clientIP = event.getClientAddress();
    console.log(clientIP);
    
    if (event.url.pathname.startsWith('/inventory')) {
        console.log('entro');
        
        if (!allowedIPs.includes(clientIP)) error( 403, {message: 'Acceso denegado: Tu IP no está autorizada.'});
    }

    const response = await resolve(event);
    return response;
};

export const handleCategoryCreation = async (item: any, Model:any, CategoryModel:any) => {
  const items = await Model.find();
  item.id = items.length + 1 
 
  const itemExist = await Model.findOne({ name: item.name });
  if (itemExist) throw new Error(`Ya existe ese Producto del ${item.type}`);

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


