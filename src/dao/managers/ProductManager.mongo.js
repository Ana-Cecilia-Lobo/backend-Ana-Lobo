import { productsModel } from "../models/products.model.js";

export class ProductsMongo{
    
    constructor(){
        this.model = productsModel;
    }
}