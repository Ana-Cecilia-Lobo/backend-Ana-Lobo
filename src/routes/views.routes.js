import {Router} from "express";
import { ProductsMongo } from "../dao/managers/ProductManager.mongo.js";
import { CartsMongo } from "../dao/managers/CartManager.mongo.js";

const manager = new ProductsMongo();
const managerCart = new CartsMongo();
const router = Router();

//Middlewares
const checkSession = (req, res, next)=>{
    if(req.user){
        next();
    } else {
        res.send('Debes iniciar sesion para acceder a este recurso <a href="/singup">intente de nuevo</a></div>')
    } 
}

router.get("/", checkSession, async(req, res)=>{
    try{
        const products = await manager.getProducts();
        //console.log(products)
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

router.get("/chat", checkSession, async(req,res)=>{
    res.render("chat");
});

router.get("/products", checkSession, async(req,res)=>{
    const {limit=3,page=1,sort="asc",category,stock} = req.query;
    if(!["asc","desc"].includes(sort)){
        return res.json({status:"error", message:"ordenamiento no valido, solo puede ser asc o desc"})
    };
    const sortValue = sort === "asc" ? 1 : -1;
    const stockValue = stock === 0 ? undefined : parseInt(stock);
    // console.log("limit: ", limit, "page: ", page, "sortValue: ", sortValue, "category: ", category, "stock: ", stock);
    let query = {};
    if(category && stockValue){
        query = {category: category, stock:stockValue}
    } else {
        if(category || stockValue){
            if(category){
                query={category:category}
            } else {
                query={stock:stockValue}
            }
        }
    }

    const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

    const result = await manager.getPaginate(query, {
        page,
        limit,
        sort:{price:sortValue},
        lean:true
    });

    const response = {
        status:"success",
        payload:result.docs,
        totalPages:result.totalPages,
        totalDocs:result.totalDocs,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page:result.page,
        hasPrevPage:result.hasPrevPage,
        hasNextPage:result.hasNextPage,
        prevLink: result.hasPrevPage ? `${baseUrl.replace( `page=${result.page}` , `page=${result.prevPage}` )}` : null,
        nextLink: result.hasNextPage ? `${baseUrl.replace( `page=${result.page}` , `page=${result.nextPage}` )}` : null,
    }
   
    res.render("products",response);
})

router.get("/carts/:cid",async(req,res)=>{
    try {
        const id = req.params.cid;
        const cart = await managerCart.getCartById(id);
        const products = cart.products;
        //console.log(products)
        res.render("cart", {products});
    } catch (error) {
        
    }
    
});

router.get("/realtimeproducts", checkSession, async(req,res)=>{
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

router.post("/realtimeproducts", async(req,res)=>{
    try{
        const product = req.body;
        const add = await manager.addProduct(product);
        if(add){
            res.redirect("/realtimeproducts")
        }
    }catch(error){
        res.redirect("/realtimeproducts")
    }
});


router.get("/login", async(req,res)=>{
 
    res.render("login")
    
});

router.get("/singup", async(req,res)=>{
    
    res.render("singup")

});

router.get("/profile", checkSession, async(req,res)=>{
   
    res.render("profile",{email:req.user.email});

});

router.get("/user-cart", checkSession, async(req,res)=>{
   
    res.json(req.user.cart);

});

export {router as viewsRouter};