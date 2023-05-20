import { cartsModel } from "../models/carts.models";

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
            const data = await this.model.findByIdAndUpdate(cartId,productId,{new:true});
            if(!data){
                throw new Error("El carrito no existe")
            }
            return data;
            
        } catch (error) {
            throw new Error(error.message);
        }
    }
}