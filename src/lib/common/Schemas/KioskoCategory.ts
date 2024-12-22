import mongoose from 'mongoose';

const KioskoCategorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'KioskoItem' }]
});

const KioskoCategory = mongoose.models.KioskoCategory || mongoose.model('KioskoCategory', KioskoCategorySchema);
export default KioskoCategory;

// Explicación
// KioskoItemSchema: Define el esquema para los elementos del kiosko con los tipos de datos
//  y requisitos.
// KioskoCategorySchema: Define el esquema para las categorías del kiosko, incluyendo una 
// referencia a los elementos (items) usando ObjectId y ref.
// Uso en tu Proyecto
// Asegúrate de importar y usar estos modelos en tus controladores o rutas donde necesites 
// interactuar con la base de datos.