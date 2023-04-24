import {Router} from "express";
import CartManager from "../managers/CartManager.js";
import ProductManager from "../managers/ProductManager.js";

const p_manager = new ProductManager("./files/products.json");
const manager = new CartManager("./files/carts.json");
const router = Router();

//Ruta principal api/cart


router.post("/",async(req, res)=>{
    try {
        const create = await manager.addCart();
        res.json({status:"success", data:create});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }

});

router.get("/:cid",async(req,res)=>{
    try{
        const id = Number(req.params.cid);
        if(id){
            const cartId = await manager.getCartById(id);
            res.json({status:"success", data: cartId});
        }else{
            res.json({status: "error", data: "el id no es un numero"});
        } 
    }catch(error){
        res.json({status: "error", data: error.message});
    } 
});

router.post("/:cid/product/:pid", async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        console.log( cartId, productId)
        const cart = await manager.getCartById(cartId);
        if(cart){
            const product = await p_manager.getProductById(productId);
            if(product){
                const addPtoC  = await manager.addProductToCart(cartId,productId);
                res.json({status:"success", message:addPtoC});
            } else {
                res.status(400).json({status:"error", message:"No es posible agregar este producto"});
            }
        } else {
            res.status(400).json({status:"error", message:"el carrito no existe"});
        }
    } catch (error) {
        res.status(400).json({status:"error", message:error.message});
    }
});


export {router as CartRouter};