import { productsModel } from "../models/products.model.js";

export class ProductsMongo{
    
    constructor(){
        this.model = productsModel;
    }

    async getProducts(){ 
        try{  
            const products = await this.model.find();
            return products; 
        }catch(error){
            throw new Error(`Error al capturar los productos ${error.message}`);
        }
    }

    async getProductById(id){
        try {
            const product = await this.model.findById(id);
            if(product){
                return product;
            }else{
                throw new Error(`El producto con el id ${id} no existe`);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async addProduct(product){
        try {

            const data = await this.model.create(product);
            return data;
           
        } catch (error) {
            throw new Error(`Error al crear el producto ${error.message}`);
        }
    }

    async updateProduct(id,product){
        try {
            const data = await this.model.findByIdAndUpdate(id,product,{new:true});
            if(!data){
                throw new Error("El producto no existe")
            }
            return data;
        } catch (error) {
            throw new Error(`Error al actualizar el producto ${error.message}`);
        }
    }

    async deleteProduct(id){
        try {
            await this.model.findByIdAndDelete(id);
            return {message: "Producto eliminado"};
        } catch (error) {
            throw new Error(`Error al eliminar el producto ${error.message}`);
        }
    };

}