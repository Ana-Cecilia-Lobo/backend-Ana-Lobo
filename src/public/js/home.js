
const socketClient = io()


const data = document.getElementsByClassName("data");
const sendButton = document.getElementById("sendButton");
const prodHistory = document.getElementById("prodHistory");


sendButton.addEventListener("click",(e)=>{
    const product = []
    for (let i = 0; i < data.length; i++) {
        product.push(data[i].value)
      }

    const productoFinal = {"title" : product[0], "description" : product[1], "code" : product[2], "price" : product[3], "status" : product[4], "stock" : product[5], "category" : product[6], "thumbnails" : product[7]};
    
    socketClient.emit("producto",productoFinal);
});


socketClient.on("addProd",(data)=>{
    prodHistory.innerHTML="";
    data.forEach(item=> {
        //crear un parrafo por mensaje
        const li = document.createElement("li");
        const ul = document.createElement("ul");
        const p = document.createElement("p");
        p.innerHTML = item;
        prodHistory.appendChild(li);
        li.appendChild(ul);
        ul.appendChild(p);
    });
});




//const arrayProducts = products.innerHTML;
/*
sendButton.addEventListener("click",(e)=>{
    const product = []
    for (let i = 0; i < data.length; i++) {
        product.push(data[i].value)
      }

    const productoFinal = {"title" : product[0], "description" : product[1], "code" : product[2], "price" : product[3], "status" : product[4], "stock" : product[5], "category" : product[6], "thumbnails" : product[7]};
    socketClient.emit("addProd",productoFinal);
    
});

socketClient.on("products",(data)=>{

    data.forEach(item => {
        //crear un parrafo por mensaje
        const li = document.createElement("li");
        const ul = document.createElement("ul");
        const p = document.createElement("li");
        parrafo.innerHTML= item;
        prodHistory.appendChild(li);
        li.appendChild(ul);
        ul.appendChild(p);
    });
    
});*/




