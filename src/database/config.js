import mongoose from "mongoose";

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log("se conectó correctamente a la BASE DE DATOS");
    } catch (error) {
       console.log(error);
       throw new Error('Error al establecer conexión');
    }
}

export default dbConnection;