import dotenv from "dotenv"
dotenv.config();


export const config = {
    port:process.env.PORT || 3000,
    secretSession: process.env.SECRET_SESION,
    mongoUrl:process.env.MONGO_URL,
    adminEmail: process.env.ADMIN_EMAIL
}