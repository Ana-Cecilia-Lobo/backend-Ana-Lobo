import mongoose from "mongoose";
import { configuracion } from "./config.js";
import { config } from "dotenv";

export const connectDB = async()=>{
    try {
        await mongoose.connect(configuracion.mongo.url);
        console.log("base de datos conectada");
    } catch (error) {
        console.log(`Hubo un error al conectar la base de datos ${error.message}`);
    }
}