const fs = require("fs");

class ProductManager{

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
                const includesKeys = verifyKeys.includes("title", 'description', 'price', 'thumbnail','code','stock')
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

                    //console.log(verificarCode)
                    if(repeat == true){
                        return console.log("Ya se ha agregado este producto")
                    }

                    products.push(product);
                    await fs.promises.writeFile(this.path,JSON.stringify(products,null,2));
                    return product;
                }else{
                    return console.log("Hay un campo vacío");
                }
            }else{
                //Verificar que los campos esten completos
                const verifyKeys = Object.keys(product);
                const verifyValues = Object.values(product);
                const includesValues =  verifyValues.includes(undefined);
                const includesKeys = verifyKeys.includes("title", 'description', 'price', 'thumbnail','code','stock')

                if(includesKeys == true && includesValues == false){
                    const productId = this.generateId([]);
                    product.id = productId;
                    await fs.promises.writeFile(this.path,JSON.stringify([product],null,2));
                    return product;
                }else{
                    return console.log("Hay un campo vacío");
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
                    await fs.promises.writeFile(this.path,JSON.stringify(products,null,2));
                    return `El producto con el id ${id} fue modificado`;
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
                    return `El producto con el id ${id} fue eliminado`;
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
        const productAdded = await manager.addProduct({title:"cocina", description: "amarilla", price:1300, thumbnail: "aaaa", code: 1111, stock: 3});
        console.log("productAdded: ", productAdded);

        const productAdded2 = await manager.addProduct({title:"nevera", description: "azul", price:1200, thumbnail: "aaa", code: 1222, stock: 5});
        console.log("productAdded: ", productAdded2);

        const getProducts2 = await manager.getProducts();
        console.log("Productos: ", getProducts2)

        const getId = await manager.getProductById(1);
        console.log("Producto: ", getId)

        const productMod = await manager.updateProducts(2,{title: "nevera"})
        console.log("producto modificado:", productMod)

        const productElim = await manager.deleteProducts(1)
        console.log("product elminido:", productElim)

    }catch(error){
        console.log(error.message);
    }
}

fucnionPrincipal();