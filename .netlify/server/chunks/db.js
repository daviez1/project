import mongoose from "mongoose";
const mongoConnection = {
  isConnected: 0
};
const dbConnect = async () => {
  try {
    if (mongoConnection.isConnected === 1) {
      return;
    }
    if (mongoose.connections.length > 0) {
      mongoConnection.isConnected = mongoose.connections[0].readyState;
      if (mongoConnection.isConnected === 1)
        console.log("usando conexion existente");
      await mongoose.disconnect();
    }
    const db = await mongoose.connect("mongodb://127.0.0.1:27017/Hanoi", {
      dbName: "Hanoi"
    });
    mongoConnection.isConnected = 1;
    console.log("Estamos conectados");
    return db;
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
};
export {
  dbConnect as d
};
