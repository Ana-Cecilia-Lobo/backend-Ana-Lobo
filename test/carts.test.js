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
        //await cartsModel.deleteMany({});
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
        })
/*
    it("Se debe devolver los productos en formato de objeto", async function(){
        const result = await this.manager.getPaginate();
        expect(result).to.be.an("object");
    });

    it("Se debe modificar un producto a la base de datos", async function(){
        const mockUser ={
            title: "Monitor",
            description:"Samsung",
            price:1000,
            code:"1121",
            status:true,
            stock:28,
            category:"Electrónicos"
        }
        const result = await this.manager.addProduct(mockUser)
        const prodID = result._id;
        const update = {...mockUser};
        update.description = "lg";
        const resultUpdate = await this.manager.updateProduct(prodID, update);

        expect(resultUpdate.description).to.be.equal("lg")
    });

    it("Se debe eliminar un producto a la base de datos", async function(){
        const mockUser ={
            title: "Monitor",
            description:"Samsung",
            price:1000,
            code:"1121",
            status:true,
            stock:28,
            category:"Electrónicos"
        }
        const result = await this.manager.addProduct(mockUser)
        const prodID = result._id;
        const resultDelete = await this.manager.deleteProduct(prodID);

        expect(resultDelete).to.include({message: "Producto eliminado"})
    });*/
}) 