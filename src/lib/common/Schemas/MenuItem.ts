import mongoose from 'mongoose';

export const MenuItemSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    available: { type: Boolean, required: true }
});

const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema); 
export default MenuItem;

// Explicación
// MenuItemSchema: Define el esquema para los elementos del menú con los tipos de datos y requisitos.
// MenuCategorySchema: Define el esquema para las categorías del menú, incluyendo una referencia a 
// los elementos (items) usando ObjectId y ref.
// Uso en tu Proyecto
// Asegúrate de importar y usar estos modelos en tus controladores o rutas donde necesites interactuar
// con la base de datos.