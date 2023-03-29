class ProductManager{

    constructor(){

        this.productos = [];
    }

    getProducts(){

        return this.productos;
    }

    getProductById(id){

        let buscarID = this.productos.find(p => p.id == id)
         
        return buscarID;
    }

    addProduct(title, description, price, thumbnail, code, stock){

       if(!title || !description || !price || !thumbnail || !code || !stock){

            console.log("Le falta un campo");

       }else{

            let newID =  this.productos.length +1 ;
            const nuevoProducto = {

                id: newID,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }

            let codigo = code;

            const verificarCode = this.productos.some(cod => cod.code == codigo);
            
            if(verificarCode == true){

                console.log("Error, ya ha sido agregado");

            }else{

                this.productos.push(nuevoProducto);
                
            }
        }
    }   
}


const producto = new ProductManager();
producto.addProduct("platano", "", 2000, "x", 1224, 2);
console.log(producto.getProducts());

producto.addProduct("platano", "amarillo", 2000, "x", 1224, 2);
console.log(producto.getProducts());

producto.addProduct("platano", "amarillo", 2000, "x", 1224, 3);

producto.addProduct("manzana", "roja", 2200, "x", 1234, 5);
console.log(producto.getProducts());

console.log(producto.getProductById(2));
console.log(producto.getProductById(3));