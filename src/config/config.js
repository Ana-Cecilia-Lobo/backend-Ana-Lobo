import dotenv from "dotenv"
dotenv.config();

export const configuracion = {
    filesystem:{
        products: "products.json",
        carts:"carts.json"
    },
    server:{
        port: process.env.PORT || 3000,
        secretSession: process.env.SECRET_SESION,
        persistence: process.env.PERSISTENCE
    },
    mongo:{
        url:process.env.MONGO_URL,
    }
};