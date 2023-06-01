import {Router} from "express";
import { CartsMongo } from "../dao/managers/CartManager.mongo.js";
import { ProductsMongo } from "../dao/managers/ProductManager.mongo.js";

const p_manager = new ProductsMongo();
const manager = new CartsMongo();
const router = Router();

//Ruta principal api/cart


router.post("/",async(req, res)=>{
    try {
        const create = await manager.addCart();
        res.json({status:"success", data:create});
    } catch (error) {
        res.status(400).json({status:"error", message:error.message});
    }

});

router.get("/:cid",async(req,res)=>{
    try{
        const id = req.params.cid;
        if(id){
            const cartId = await manager.getCartById(id);
            res.json({status:"success", data: cartId});
        }else{
            res.status(400).json({status: "error", data: "el id no es un numero"});
        } 
    }catch(error){
        res.status(400).json({status: "error", data: error.message});
    } 
});

router.post("/:cid/product/:pid", async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const productID = req.params.pid;
        const cart = await manager.getCartById(cartId);
        if(cart){
            const product = await p_manager.getProductById(productID);
            if(product){
                const addPtoC  = await manager.addProductToCart(cartId,productID);
                //console.log(addPtoC)
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

router.delete("/:cid/product/:pid", async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        
        const cart = await manager.getCartById(cartId);
        if(cart){
            const product = await p_manager.getProductById(productId);
            if(product){
                const deleteProduct  = await manager.deleteProducts(cartId,productId);
                console.log(deleteProduct)
                res.json({status:"success", message: deleteProduct});
            } else {
                res.status(400).json({status:"error", message:"No es posible eliminar este producto"});
            }
        } else {
            res.status(400).json({status:"error", message:"el carrito no existe"});
        }
    } catch (error) {
        
    }
})

router.put("/:cid/product/:pid", async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const productID = req.params.pid;
        const quantity = req.body.quantity;
        console.log(quantity)
        
        const cart = await manager.getCartById(cartId);
        if(cart){
            const product = await p_manager.getProductById(productID);
            if(product){
                const updateQuantity = await manager.updateQuantity(cartId,productID,quantity);
                console.log(updateQuantity)
                res.json({status:"success", message: updateQuantity});
            } else {
                res.status(400).json({status:"error", message:"No es posible agregar este producto"});
            }
        } else {
            res.status(400).json({status:"error", message:"el carrito no existe"});
        }
    
    } catch (error) {
        
    }
})


router.delete("/:cid", async(req,res)=>{
    try {
        const cartId = req.params.cid;
        
        const deleteCart  = await manager.deleteCart(cartId);
        console.log(deleteCart)
        res.json({status:"success", message:deleteCart});
        
    } catch (error) {
        
    }
})

export {router as CartRouter};