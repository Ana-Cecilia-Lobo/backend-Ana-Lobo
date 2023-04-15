import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const manager = new ProductManager("./products.json");

const port = 8080;

//Buscar y entregar lista de productos
app.get("/products",async(req,res)=>{
    const products = await manager.getProducts();
    const limit = req.query.limit;
    try{
        if(limit){
            let productsLimit = [];
            for(let i = 0; i < limit; i++){
                productsLimit.push(products[i])
            }
            res.json(productsLimit);
        }else{
            throw new Error
        }
    }catch{
        res.json(products)
    }
});

//Buscar productos por id 
app.get("/products/:pid",async(req,res)=>{
    try{
        const id = req.params.pid;
        const productId = await manager.getProductById(id);
        res.json(productId)
    }catch{
        res.status(500).json("Producto no encontrado")
    } 
});

app.listen(port,()=>console.log(`Server listening on port ${port}`));