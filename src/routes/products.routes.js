import {Router} from "express";
import ProductManager from "../managers/ProductManager.js";

const manager = new ProductManager("./files/products.json");
const router = Router();

//Ruta principal api/products

//Obtener productos
router.get("/",async(req, res)=>{
    try{
        const products = await manager.getProducts();
        const limit = req.query.limit;
        if(limit){
            let productsLimit = [];
            for(let i = 0; i < limit; i++){
                productsLimit.push(products[i]);
            }
            res.json({status:"success", data: productsLimit});
        }else{
            res.json({status:"success", data: products});
        }
    }catch(error){
        res.json({status: "error", data: error.message});
    }
});


//Obtener productos por id
router.get("/:pid",async(req,res)=>{
    try{
        const id = Number(req.params.pid);
        if(id){
            const productId = await manager.getProductById(id);
            res.json({status:"success", data: productId});
        }else{
            res.json({status: "error", data: "el id no es un numero"});
        } 
    }catch(error){
        res.json({status: "error", data: error.message});
    } 
});


//Agregar productos
router.post("/",async(req,res)=>{
    try{
        const product = req.body;
        const add = await manager.addProduct(product);
        if(add){
            res.json({status:"success", data: product});
        }else{
            res.json("Error");
        }
    }catch(error){
        res.json({status: "error", data: error.message});
    }
});


//Modificar productos
router.put("/:pid", async(req, res)=>{
    try{
        const product = req.body;
        const id = Number(req.params.pid);
        if(id){
            const update = await manager.updateProducts(id, product);
            res.json({status: "success", data: update})
        }else{
            res.json("Error, el id no es un número");
        } 
    }catch(error){
        res.json({status: "error", data: error.message});
    }

});

//Eliminar productos
router.delete("/:pid", async(req, res)=>{
    try{
        const id = Number(req.params.pid);
        if(id){
            const deleteProduct = await manager.deleteProducts(id);
            res.json({status: "success", data: "Se ha eliminado el producto con el id: " + deleteProduct})
        }else{
            res.json("Error, el id no es un número");
        } 
    }catch(error){
        res.json({status: "error", data: error.message});
    }
});

export {router as ProductRouter};