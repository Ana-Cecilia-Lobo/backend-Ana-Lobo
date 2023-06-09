import { ProductsMongo } from "../dao/managers/ProductManager.mongo.js";
const manager = new ProductsMongo();

//Obtener productos
export const getProducts = async(req, res)=>{
    try{

        const {limit=10,page=1,sort,category,stock} = req.query;

        if(sort){
            if(!["asc","desc"].includes(sort)){
                res.json({status:"error", message:"ordenamiento no válido, solo puede ser asc o desc"})
            }
        }
            
        const sortValue = sort === "asc" ? 1 : -1;
        const stockValue = stock === 0 ? undefined : parseInt(stock);

        let query = {};

        if(category && stock){
            query = {category: category, stock: stockValue}
        }else{
            if(category || stockValue){
                if(category){
                    query={category: category}
                }else{
                    query={stock: stockValue}
                }
            }
        }

        const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

        const result = await manager.getPaginate(query, {
            page,
            limit,
            sort:{price: sortValue},
            lean:true
        });
       
        const response ={
            status:"success",
            payload:result.docs,
            totalPages:result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page:result.page,
            hasPrevPage:result.hasPrevPage,
            hasNextPage:result.hasNextPage,
            prevLink: result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}` : null,
            nextLink: result.hasNextPage ? `${baseUrl}?page=${result.nextPage}` : null,
        }
        console.log("response: ", response);
        res.json(response)

    }catch(error){
        res.status(400).json({status: "error", data: error.message});
    }
}

//Obtener productos por ID
export const getProductsID = async(req,res)=>{
    try{
        const id = req.params.pid;
        if(id){
            const productId = await manager.getProductById(id);
            res.json({status:"success", data: productId});
        }else{
            res.status(400).json({status: "error", data: "el id no es un numero"});
        } 
    }catch(error){
        res.status(400).json({status: "error", data: error.message});
    } 
}

//Agregar productos
export const addProducts = async(req,res)=>{
    try{
        const product = req.body;
        const add = await manager.addProduct(product);
        if(add){
            res.json({status:"success", data: product});
        }
    }catch(error){
        res.status(400).json({status: "error", data: error.message});
    }
}

//Modificar productos
export const updateProducts = async(req, res)=>{
    try{
        const product = req.body;
        const id = req.params.pid;
        if(id){
            const update = await manager.updateProduct(id, product);
            res.json({status: "success", data: update})
        }else{
            res.status(400).json("Error, el id no es un número");
        } 
    }catch(error){
        res.status(400).json({status: "error", data: error.message});
    }

}

//Eliminar productos
export const deleteProducts = async(req, res)=>{
    try{
        const id = req.params.pid;
        if(id){
            const deleteProduct = await manager.deleteProducts(id);
            res.json({status: "success", data: "Se ha eliminado el producto con el id: " + deleteProduct})
        }else{
            res.status(400).json("Error, el id no es un número");
        } 
    }catch(error){
        res.status(400).json({status: "error", data: error.message});
    }
}