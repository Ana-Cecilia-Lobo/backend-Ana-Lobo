import mongoose from "mongoose";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({

    title:{ type: String, required:true},
    description:{ type: String, required:true},
    price:{ type: Number, required:true},
    code:{ 
        type: String, 
        required: true, 
        unique: true,
    },
    status:{ type: Boolean, required:true, default: true},
    thumbnail:{ type: String},
    stock:{ type: Number, required:true},
    category:{ type: String, required:true},
});

export const productsModel = mongoose.model(productsCollection,productsSchema);

//CODE UNICO!!!!!!!!