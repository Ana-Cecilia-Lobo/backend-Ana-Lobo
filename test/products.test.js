import chai from "chai"
import mongoose from "mongoose"
import { ProductsMongo } from "../src/dao/managers/mongo/ProductManager.mongo.js"
import { productsModel } from "../src/dao/managers/mongo/models/products.model.js"

const expect = chai.expect

describe("Testing para products DAO", ()=>{
    before(async function(){
        await mongoose.connect("mongodb+srv://anacl1935:anachua2005@cluster-ana.8adxgaa.mongodb.net/test?retryWrites=true&w=majority");
        this.manager = new ProductsMongo();
    });

    beforeEach(async function(){
        await productsModel.deleteMany({});
    });

    it("Se debe devolver los productos en formato de objeto", async function(){
        const result = await this.manager.getPaginate();
        expect(result).to.be.an("object");
    });

    it("Se debe agregar un producto a la base de datos", async function(){
        const mockProd ={
            title: "Monitor",
            description:"Samsung",
            price:1000,
            code:"1121",
            status:true,
            stock:28,
            category:"Electrónicos"
        }
        const result = await this.manager.addProduct(mockProd)
        expect(result).to.be.an("object").to.have.property("_id")
    });

    it("Se debe modificar un producto a la base de datos", async function(){
        const mockProd ={
            title: "Monitor",
            description:"Samsung",
            price:1000,
            code:"1121",
            status:true,
            stock:28,
            category:"Electrónicos"
        }
        const result = await this.manager.addProduct(mockProd)
        const prodID = result._id;
        const update = {...mockProd};
        update.description = "lg";
        const resultUpdate = await this.manager.updateProduct(prodID, update);

        expect(resultUpdate.description).to.be.equal("lg")
    });

    it("Se debe eliminar un producto a la base de datos", async function(){
        const mockProd ={
            title: "Monitor",
            description:"Samsung",
            price:1000,
            code:"1121",
            status:true,
            stock:28,
            category:"Electrónicos"
        }
        const result = await this.manager.addProduct(mockProd)
        const prodID = result._id;
        const resultDelete = await this.manager.deleteProduct(prodID);

        expect(resultDelete).to.include({message: "Producto eliminado"})
    });
})