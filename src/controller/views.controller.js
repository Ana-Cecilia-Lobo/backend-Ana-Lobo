import { CartsService } from "../repository/cart.services.js";
import { ProductsService } from "../repository/products.services.js";
import { TicketService } from "../repository/ticket.services.js";
import { UserDto } from "../dao/dto/user.dto.js";

export class ViewsController{

    static get = async(req, res)=>{
        try{
            const products = await ProductsService.getProducts();
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
    };

    static getChat = async(req,res)=>{
        res.render("chat");
    };

    static getProducts = async(req,res)=>{
        try {
            const {limit=3,page=1,sort="asc",category,stock} = req.query;
            if(!["asc","desc"].includes(sort)){
                return res.json({status:"error", message:"ordenamiento no valido, solo puede ser asc o desc"})
            };
            const sortValue = sort === "asc" ? 1 : -1;
            const stockValue = stock === 0 ? undefined : parseInt(stock);
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
    
            //console.log("page", page, "limit", limit, "sort", sort, "query", query, "category", category, "sort", sort)
            const result = await ProductsService.getPaginate(query, {
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
            //console.log(response)
            res.render("products",response);
            
        } catch (error) {
            res.status(400).json({status: "error", data: error.message});
        }    
    };

    static getCart = async(req,res)=>{
        try {
            const id = req.params.cid;
            const cart = await CartsService.getCartById(id);
            const products = cart.products;
            res.render("cart", {products});
        } catch (error) {
            res.status(400).json({status: "error", data: error.message});
        }  
    };

    static getRealTimeProducts = async(req,res)=>{
        try{
            const products = await ProductsService.getProducts();
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
    };

    static postRealTimeProducts = async(req,res)=>{
        try{
            const product = req.body;
            const add = await ProductsService.addProduct(product);
            if(add){
                res.redirect("/realtimeproducts")
            }
        }catch(error){
            res.redirect("/realtimeproducts")
        }
    };

    static login = async(req,res)=>{
 
        res.render("login")
        
    };

    static singup = async(req,res)=>{
    
        res.render("singup")
    
    };

    static profile = async(req,res)=>{
   
        const userProfileInfo = new UserDto(req.user);
        res.render("profile",{userProfileInfo});
    };

    static getUserCart = async(req,res)=>{
   
        res.json(req.user.cart);
    
    };

    static getTicket = async(req,res)=>{
        try {
            const user = new UserDto(req.user);

            const email = user.email;

            const getTicket = await TicketService.getTicket(email);
            res.render("ticket", {getTicket})
        } catch (error) {
            res.status(400).json({status: "error", data: error.message});
        }
    }
}
