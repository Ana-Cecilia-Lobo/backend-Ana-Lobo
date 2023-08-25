import chai from "chai"
import mongoose from "mongoose"
import { CartsMongo } from "../src/dao/managers/mongo/CartManager.mongo.js"
import { ProductsMongo } from "../src/dao/managers/mongo/ProductManager.mongo.js"
import { cartsModel } from "../src/dao/managers/mongo/models/carts.models.js"

const expect = chai.expect

describe("Testing para carts DAO", ()=>{
    before(async function(){
        await mongoose.connect("mongodb+srv://anacl1935:anachua2005@cluster-ana.8adxgaa.mongodb.net/test?retryWrites=true&w=majority");
        this.manager = new CartsMongo();
        this.pmanager = new ProductsMongo();
    });

    beforeEach(async function(){
        await cartsModel.deleteMany({});
    });

    it("Se debe crear un carrito a la base de datos", async function(){
       
        const result = await this.manager.addCart()
        expect(result).to.be.an("object").to.have.property("_id")
    });

    it("Se debe agregar un producto a un carrito de la base de datos", async function(){
        const mockProd ={
            title: "Monitor",
            description:"Samsung",
            price:1000,
            code:"1121",
            status:true,
            stock:28,
            category:"Electrónicos"
        }
        const addProduct = await this.pmanager.addProduct(mockProd)
        
        const cart = await this.manager.addCart();
        const cid = cart._id.toString();
        const pid = addProduct._id.toString();

        const result = await this.manager.addProductToCart(cid, pid)
        expect(result).to.be.an("array").to.have.any.key("_id","products", "0");
    });

    it("Se debe eliminar un producto de un carrito de la base de datos", async function(){
        const mockProd ={
            title: "Monitor",
            description:"Samsung",
            price:1000,
            code:"112",
            status:true,
            stock:28,
            category:"Electrónicos"
           }
        const addProduct = await this.pmanager.addProduct(mockProd)
        const cart = await this.manager.addCart();
        const cid = cart._id.toString();
        const pid = addProduct._id.toString();

        const agregarProducto = await this.manager.addProductToCart(cid, pid)
            
        const result = await this.manager.deleteProducts(cid, pid)

        const [{products}] = result

        expect(products).to.be.an("array").that.is.empty;
        });
        
        it("Se debe actualizar  un carrito de la base de datos", async function(){
           
            const cart = await this.manager.addCart();
            const cid = cart._id.toString();
    
            const result = await this.manager.updateCart(cid)
            const {status} = result
            
            expect(status).to.be.equal("success");
        });
            
        it("Se debe actualizar la cantidad de un producto de un carrito de la base de datos", async function(){
            const mockProd ={
                title: "Monitor",
                description:"Samsung",
                price:1000,
                code:"111",
                status:true,
                stock:28,
                category:"Electrónicos"
               }
            const addProduct = await this.pmanager.addProduct(mockProd)
            const cart = await this.manager.addCart();
            const cid = cart._id.toString();
            const pid = addProduct._id.toString();
    
            const agregarProducto = await this.manager.addProductToCart(cid, pid)
                
            const result = await this.manager.updateQuantity(cid, pid, 2)
            
            const [{products}] = result

            const [{quantity}] = products
    
            expect(quantity).to.be.equal(3);
        });

        it("Se debe eliminar un carrito de la base de datos", async function(){
           
            const cart = await this.manager.addCart();
            const cid = cart._id.toString();
            const result = await this.manager.deleteCart(cid)
            const [{products}] = result
            expect(products).to.be.an("array").that.is.empty;
        });
}) 