import { CartsService } from "../repository/cart.services.js";
import { ProductsService } from "../repository/products.services.js";
import { TicketService } from "../repository/ticket.services.js";
import {v4 as uuidv4} from 'uuid';
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
            //console.log(quantity )
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

    static purchase = async(req,res)=>{
        try {
            const cartid = req.params.cid;
            const cart = await CartsService.getCartById(cartid);
            
            if(cart.products.length){
                let productsApproved = [];
                let productsRejected = [];
                for(let i=0; i<cart.products.length; i++){

                    const product = cart.products[i].productId;
                    const id = JSON.stringify(product._id).replace('"', '').replace('"', '')
                    const productQty = cart.products[i].quantity;
                    //console.log(id, "id", productQty, "qty")

            
                    const productDB = await ProductsService.getProductById(id);
                    const productStock = productDB.stock;

                    if(productStock >= productQty){
                        const updateProduct = await ProductsService.updateProduct(id, {"stock": productStock-productQty});
                        //console.log(updateProduct)
                        productsApproved.push(product.price*productQty);
                        const deleteProductCart = CartsService.deleteProducts(cartid, id)
                        //console.log(deleteProductCart)
                    }else{
                        productsRejected.push(product);
                    }
                }

                const code = uuidv4();

                let today = new Date();

                let totalAmount = productsApproved.reduce((a, b) => a + b, 0);

                const email = req.user.email;

                const ticket = {code: code, purchase_datetime: today, amount: totalAmount, purchaser: email}

                const createTicket  = await TicketService.createTicket(ticket);

                //console.log(createTicket)

                if(productsRejected.length >= 1 && productsApproved.length < 1){
                    res.json({status:"error", message: "No se pudo procesar ningun producto"});
                }else if(productsRejected.length >= 1 && productsApproved >= 1){
                    res.json({status:"success", message: "Compra finalizada con éxito, este es el ticket de su compra "+ createTicket + " Pero hubo " + productsRejected.length + " productos que no pudieron procesarse" });
                }else{
                    res.json({status:"success", message: "Compra finalizada con éxito, este es el ticket de su compra"+ createTicket});
                }
                
            }else{
                res.status(400).json({status:"error", message:"el carrito no tiene productos"});
            }
            
             
            
        } catch (error) {
            res.status(400).json({status:"error", message:error.message});
        }
    }; 

}
