const socketClient = io();

const addToCart = async(productId)=>{
    

    socketClient.emit("cart", productId);

    //const addPtoC  = await cartmanager.addProductToCart(cartId,productID);

    //console.log("Este sera el producto a agregar", productId);
};



socketClient.on("cartId", (data) => { 

    console.log(`El producto con el id ${data[1]} se ha agregado al carrito con id ${data[0]} correctamente`)

    
})