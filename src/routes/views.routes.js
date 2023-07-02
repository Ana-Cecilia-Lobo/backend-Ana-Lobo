import {Router} from "express";
import { get, getChat, getProducts, getCart, getRealTimeProducts, postRealTimeProducts, login, singup, profile, getUserCart } from "../controller/views.controller.js";
const router = Router();

//Middlewares
const checkSession = (req, res, next)=>{
    if(req.user){
        next();
    } else {
        res.send('Debes iniciar sesion para acceder a este recurso <a href="/singup">intente de nuevo</a></div>')
    } 
}

router.get("/", checkSession, get);

router.get("/chat", checkSession, getChat);

router.get("/products", checkSession, getProducts)

router.get("/carts/:cid", getCart);

router.get("/realtimeproducts", checkSession, getRealTimeProducts);

router.post("/realtimeproducts", postRealTimeProducts);


router.get("/login", login);

router.get("/singup", singup);

router.get("/profile", checkSession, profile);

router.get("/user-cart", checkSession, getUserCart);

export {router as viewsRouter};