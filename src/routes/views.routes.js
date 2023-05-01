import {Router} from "express";
import ProductManager from "../managers/ProductManager.js";

const manager = new ProductManager("./files/products.json");
const router = Router();


router.get("/",async(req, res)=>{
    try{
        const products = await manager.getProducts();
        const limit = req.query.limit;
        if(limit){
            let productsLimit = [];
            for(let i = 0; i < limit; i++){
                productsLimit.push(products[i]);
            }
            const renProducts = productsLimit
            res.render("home", {renProducts})
        }else{
            const renProducts = products;
            res.render("home", {renProducts})
        }
    }catch(error){
        res.status(400).json({status: "error", data: error.message});
    }
});


router.get("/realtimeproducts",async(req,res)=>{
    try{
        const products = await manager.getProducts();
        const limit = req.query.limit;
        if(limit){
            let productsLimit = [];
            for(let i = 0; i < limit; i++){
                productsLimit.push(products[i]);
            }
            const renProducts = productsLimit
            res.render("realTimeProducts", {renProducts})
        }else{
            const renProducts = products;
            res.render("realTimeProducts", {renProducts})
        }
    }catch(error){
        res.status(400).json({status: "error", data: error.message});
    }
});

router.post("/realtimeproducts",async(req,res)=>{
    try{
        const product = req.body;
        const add = await manager.addProduct(product);
        if(add){
            //res.render("realTimeProducts")
        }
    }catch(error){
        res.status(400).json({status: "error", data: error.message});
    }
});


export {router as viewsRouter};