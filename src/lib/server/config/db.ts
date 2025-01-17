import mongoose from 'mongoose';

const mongoConnection = {
  isConnected: 0
};

export const dbConnect = async () => {
  try {
    if (mongoConnection.isConnected === 1) {
      return mongoose.connection.db; // Devuelve la instancia de la base de datos
    }
    if (mongoose.connections.length > 0) {
      mongoConnection.isConnected = mongoose.connections[0].readyState;
      if (mongoConnection.isConnected === 1) {
        console.log('Usando conexión existente');
        return mongoose.connection.db; // Devuelve la instancia de la base de datos
      }
      await mongoose.disconnect();
    }
    const db = await mongoose.connect('mongodb://127.0.0.1:27017/Hanoi', {
      dbName: 'Hanoi',
    });
    mongoConnection.isConnected = 1;
    console.log('Estamos conectados');
    return mongoose.connection.db; // Devuelve la instancia de la base de datos
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
};
