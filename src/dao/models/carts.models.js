import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
    products: {
        type:[
            {
                productId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"products"
                },
                quantity:{
                    type:Number,
                    required:true,
                    default:1
                }
            }
        ],
        required:true,
        default:[]
    }
});
/*
cartsSchema.pre("findOne",function(next){
    this.populate({ path: 'products', select: '_id' });
    next()
});*/

export const cartsModel = mongoose.model(cartsCollection,cartsSchema);