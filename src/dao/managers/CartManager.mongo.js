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
            const cart = await this.model.findById(id).lean().populate('products.productId');
            if(cart){
                return cart;
            }else{
                throw new Error(`El carrito con el id ${id} no existe`);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async addProductToCart(cartId,productID){
        try {
            const cart = await this.model.findById(cartId)
            if(cart){
                const arrayCart = cart.products;
                const productIds = arrayCart.map((item) => item.productId.toString())
                const verifyExistance = productIds.includes(productID)
                console.log(verifyExistance)

                if(verifyExistance == true){

                    const data =await this.model.findOneAndUpdate(
                        { _id: cartId, "products.productId": productID},                  
                        { $inc: { "products.$.quantity": 1 } },
                        { new: true });
                        console.log(data)
                    const cart = await this.model.find({_id: cartId}).populate('products.productId');
                    return cart    
                }else{
                    const data = await this.model.findOneAndUpdate(
                        { _id: cartId},
                        { $push: { products: { productId: productID, quantity: 1 } } },
                        );  
                        console.log(data)
                        console.log("agregado")

                    const cart = await this.model.find({_id: cartId}).populate('products.productId');
                    return cart   
                }
            }  
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteProducts(cartId,productID){
        try {
            const cart = await this.model.findById(cartId)

            if(cart){
                const arrayCart = cart.products;

                const productIds = arrayCart.map((item) => item.productId.toString())

                const verifyExistance = productIds.includes(productID)

                console.log(verifyExistance)

                if(verifyExistance == true){

                    console.log("Si")
                    const data =  await this.model.findOneAndUpdate(
                        { _id: cartId}, 
                        { $pull: { products: { productId: productID } } },
                        { new: true }
                          );
                    const cart = await this.model.find({_id: cartId});
                    return cart  

                }else{
                    console.log("no")
                    throw new Error("El producto con el id ${productID} no existe")
                }
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateQuantity(cartId,productID, quantity){
        try {
            const data =await this.model.findOneAndUpdate(
                { _id: cartId, "products.productId": productID},                  
                { $inc: { "products.$.quantity": quantity } },
                { new: true });
                console.log(data)
            const cart = await this.model.find({_id: cartId}).populate('products.productId');
            return cart 
            
        } catch (error) {
            
        }
    }


    async deleteCart(cartId){
        try {     
            const data =  await this.model.findOneAndUpdate(
                { _id: cartId},                  
                {$unset: {products: 1}},
                { new: true });
            console.log(data)
            const cart = await this.model.find({_id: cartId});
            console.log(cart)
            return cart  
        } catch (error) {
            throw new Error(error.message);
        }
        
    }
}