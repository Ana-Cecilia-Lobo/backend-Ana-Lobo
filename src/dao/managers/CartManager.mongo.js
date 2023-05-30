import { cartsModel } from "../models/carts.models.js";

export class CartsMongo{

    constructor(){
        this.model = cartsModel;
    }

    async addCart(cart){
        try {
            const data = await this.model.create(cart);
            return data;     
        } catch (error) {
            throw new Error(`Error al crear el carrito ${error.message}`);
        }
    }

    async getCartById(id){
        try {
            const cart = await this.model.findById(id);
            if(cart){
                return cart;
            }else{
                throw new Error(`El carrito con el id ${id} no existe`);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async addProductToCart(cartId,productId){
        try {
            const data = await this.model.findByIdAndUpdate(
                { _id: cartId },
                { $push: { products: { product: productId, quantity: 1 } } },
                { new: true }
              ).populate({ path: 'products', select: '_id' });
             
                return data

            /*
            const cart = await this.model.findById(cartId)
            console.log(cart)

            if(cart){
                const verifyExistance = cart.products.findIndex(p => p._id === productId);
                if(verifyExistance >= 0){

                }
            }
            
            //const verify_product = await this.model.findById
                const data = await this.model.findOneAndUpdate(
                    { _id: cartId },
                    { $push: { products: { _id: productId } } },
                    { $inc: { products: { "products.$.quantity": 1 } }},
                    { new: true }
                    );

           return data;*/
            
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteProducts(cartId,productId){
        try {
            const data =  await this.model.findOneAndUpdate(
                { _id: cartId}, 
                { $pull: { products: { _id: productId } } }
                  );
            
                return data
            
        } catch (error) {
            
        }
    }

    async deleteProducts(cartId){
        try {
            const data =  await this.model.findOneAndUpdate(
                { _id: cartId}, 
                { $pull: { products } }
                  );
            
                return data
        } catch (error) {
            
        }
        }

    async deleteCart(cartId){
        
    }
}