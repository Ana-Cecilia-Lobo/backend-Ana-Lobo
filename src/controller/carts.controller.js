import { CartsService } from "../repository/cart.services.js";
import { ProductsService } from "../repository/products.services.js";

export class CartsController{
    static createCart = async(req, res)=>{
        try {
            const create = await CartsService.addCart();
            res.json({status:"success", data:create});
        } catch (error) {
            res.status(400).json({status:"error", message:error.message});
        }
    };

    static getCart = async(req,res)=>{
        try{
            const id = req.params.cid;
            if(id){
                const cartId = await CartsService.getCartById(id);
                res.json({status:"success", data: cartId});
            }else{
                res.status(400).json({status: "error", data: "el id no es un numero"});
            } 
        }catch(error){
            res.status(400).json({status: "error", data: error.message});
        } 
    };

    static addProduct = async(req,res)=>{
        try {
            const cartId = req.params.cid;
            const productID = req.params.pid;
            const cart = await CartsService.getCartById(cartId);
            if(cart){
                const product = await ProductsService.getProductById(productID);
                if(product){
                    const addPtoC  = await CartsService.addProductToCart(cartId,productID);
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
    };

    static deleteProduct = async(req,res)=>{
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
            
            const cart = await CartsService.getCartById(cartId);
            if(cart){
                const product = await ProductsService.getProductById(productId);
                if(product){
                    const deleteProduct  = await CartsService.deleteProducts(cartId,productId);
                    res.json({status:"success", message: deleteProduct});
                } else {
                    res.status(400).json({status:"error", message:"No es posible eliminar este producto"});
                }
            } else {
                res.status(400).json({status:"error", message:"el carrito no existe"});
            }
        } catch (error) {
            res.status(400).json({status:"error", message:error.message});
        }
    };

    static updateCart = async(req,res)=>{
        try {
            const cartId = req.params.cid;
            const cart = await CartsService.updateCart(cartId);
            res.json({status:"success", message: cart});
        } catch (error) {
            res.status(400).json({status:"error", message:error.message});
        }
    };

    static updateQuantity = async(req,res)=>{
        try {
            const cartId = req.params.cid;
            const productID = req.params.pid;
            const quantity = req.body.quantity;
            
            const cart = await CartsService.getCartById(cartId);
            if(cart){
                const product = await ProductsService.getProductById(productID);
                if(product){
                    const updateQuantity = await CartsService.updateQuantity(cartId,productID,quantity);
                    res.json({status:"success", message: updateQuantity});
                } else {
                    res.status(400).json({status:"error", message:"No es posible agregar este producto"});
                }
            } else {
                res.status(400).json({status:"error", message:"el carrito no existe"});
            }
        
        } catch (error) {
            res.status(400).json({status:"error", message:error.message});
        }
    };

    static deleteCart = async(req,res)=>{
        try {
            const cartId = req.params.cid;
            
            const deleteCart  = await CartsService.deleteCart(cartId);
            res.json({status:"success", message:deleteCart});
            
        } catch (error) {
            res.status(400).json({status:"error", message:error.message});
        }
    }; 
}
