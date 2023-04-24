import fs from 'fs'

export default class ProductManager{

    constructor(pathName){
        this.path = pathName;
    }

    fileExists(){
        return fs.existsSync(this.path);
    }

    async getProducts(){ 
        try{
            if(this.fileExists()){
                const contenido = await fs.promises.readFile(this.path,"utf-8");
                const contenidoJson = JSON.parse(contenido);
                return contenidoJson;
            }else{
                throw new Error("El archivo no existe");
            }
        }catch(error){
            throw new Error(error.message);
        }
    }

    async getProductById(id){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                const product = products.find(prod=>prod.id == id);
                if(product){
                    return product;
                } else {
                    throw new Error(`El producto con el id ${id} no existe`);
                }
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    generateId(products){
        let newId;
        if(!products.length){
            newId = 1;
        } else{
            newId = products[products.length-1].id+1;
        }
        return newId;
    }

    async addProduct(product){
        try {
            if(this.fileExists()){

                //Verificar que los campos esten completos
                const verifyKeys = Object.keys(product);
                const verifyValues = Object.values(product);

                const thumbnails = verifyKeys.includes("thumbnails");
                let includesKeys;
                if(thumbnails){
                    const keys = ['title', 'description','code','price','status','stock', 'category', 'thumbnails'];
                    verifyKeys.sort();
                    keys.sort();
                    includesKeys = keys.every(function(v,i) { return v === verifyKeys[i] } );
                }else{
                    const keys = ['title', 'description','code','price','status','stock', 'category'];
                    verifyKeys.sort();
                    keys.sort();
                    includesKeys = keys.every(function(v,i) { return v === verifyKeys[i] } );
                }
                const includesValues =  verifyValues.includes(undefined);

                if(includesKeys == true && includesValues == false){

                    const content = await fs.promises.readFile(this.path,"utf-8");
                    const products = JSON.parse(content);
                    const productId = this.generateId(products);
                    product.id = productId;

                    //Verificar que el producto no se repita
                    let repeat = false;
                    products.forEach(prod => {
                        if (prod.code === product.code) {
                            repeat = true;
                        }
                    });

                    if(repeat == true){
                        throw new Error("El producto ya existe")
                    }

                    products.push(product);
                    await fs.promises.writeFile(this.path,JSON.stringify(products,null,2));
                    return product;
                }else{
                    throw new Error("Hay campos vacíos")
                }
            }else{
                //Verificar que los campos esten completos
                const verifyKeys = Object.keys(product);
                const verifyValues = Object.values(product);

                const thumbnails = verifyKeys.includes("thumbnails");
                let includesKeys;
                if(thumbnails){
                    const keys = ['title', 'description','code','price','status','stock', 'category', 'thumbnails'];
                    verifyKeys.sort();
                    keys.sort();
                    includesKeys = keys.every(function(v,i) { return v === verifyKeys[i] } );
                }else{
                    const keys = ['title', 'description','code','price','status','stock', 'category'];
                    verifyKeys.sort();
                    keys.sort();
                    includesKeys = keys.every(function(v,i) { return v === verifyKeys[i] } );
                }
                const includesValues =  verifyValues.includes(undefined);

                if(includesKeys == true && includesValues == false){
                    const productId = this.generateId([]);
                    product.id = productId;
                    await fs.promises.writeFile(this.path,JSON.stringify([product],null,2));
                    return product;
                }else{
                    throw new Error("Hay campos vacíos")
                }
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateProducts(id, product){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                const productIndex = products.findIndex(prod=>prod.id == id);
                if(productIndex >= 0){
                    products[productIndex] ={
                        ...products[productIndex],
                        ...product
                    }
                    const productId = products[productIndex].id;
                    if(id == productId){
                        await fs.promises.writeFile(this.path,JSON.stringify(products,null,2));
                        return products[productIndex];
                    }else{
                        throw new Error("No se puede modificar el id");
                    }

                } else {
                    throw new Error(`El producto con el id ${id} no existe`);
                }
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteProducts(id){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                const productIndex = products.findIndex(prod=>prod.id == id);
                if(productIndex >= 0){
                    products.splice(productIndex, 1);
                    await fs.promises.writeFile(this.path,JSON.stringify(products,null,2));
                    return id;
                } else {
                    throw new Error(`El producto con el id ${id} no existe`);
                }
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            throw new Error(error.message);
        }

    }
}   

const manager = new ProductManager("./products.json");

const fucnionPrincipal= async ()=>{

    try{
        //const productAdded = await manager.addProduct({title:"cocina", description: "amarilla", price:1300, thumbnail: "aaaa", code: 1111, stock: 3});
        //console.log("productAdded: ", productAdded);

        //const productAdded2 = await manager.addProduct({title:"nevera", description: "azul", price:1200, thumbnail: "aaa", code: 1222, stock: 5});
        //console.log("productAdded: ", productAdded2);

        //const getProducts2 = await manager.getProducts();
        //console.log("Productos: ", getProducts2)

        //const getId = await manager.getProductById(2);
        //console.log("Producto: ", getId)

        //const productMod = await manager.updateProducts(2,{title: "neveraa"})
        //console.log("producto modificado:", productMod)

        //const productElim = await manager.deleteProducts(1)
        //console.log("product elminido:", productElim)

    }catch(error){
        console.log(error.message);
    }
}

fucnionPrincipal();
