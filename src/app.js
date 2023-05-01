import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { viewsRouter } from "./routes/views.routes.js";
import { ProductRouter } from "./routes/products.routes.js";
import { CartRouter } from "./routes/carts.routes.js";
import path from "path";
import { Server } from "socket.io";

const app = express();
const port = 8080; 


//Middlewares
app.use(express.static(path.join(__dirname,"/public")));


app.use(express.json());
app.use(express.urlencoded({extended:true}));

//configuracion del motor de plantillas
app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set("views",path.join(__dirname,"/views"));
app.set('view engine', '.hbs');

//rutas
app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter);
app.use("/", viewsRouter);

//Servidor HTTP
const httpServer = app.listen(port,()=>console.log(`Server listening on port ${port}`));

//Servidor Websocket
const socketServer = new Server(httpServer);


let products = [];
socketServer.on("connection",(socket)=>{
    console.log(`nuevo socket cliente conectado ${socket.id}`);
    //emitir el mensaje al socket actual
    //socket.emit("addProd", producto);

    socket.on("producto",(data)=>{
        const producto = JSON.stringify(data);
        console.log(producto)
        //console.log("app.js", producto)
        //emitir el mensaje a todos los clientes conectados
        socketServer.emit("addProd", producto);
    });
});