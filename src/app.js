import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import { Server } from "socket.io";

import { __dirname } from "./utils.js";
import { viewsRouter } from "./routes/views.routes.js";
import { ProductRouter } from "./routes/products.routes.js";
import { CartRouter } from "./routes/carts.routes.js";
import ProductManager from "./dao/managers/ProductManager.js";
import { connectDB } from "./config/dbConnection.js";
import {ChatMongo} from "./dao/managers/chat.mongo.js";
import { ProductsMongo } from "./dao/managers/ProductManager.mongo.js";

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

//Conexión a base de datos
connectDB();

//rutas
app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter);
app.use("/", viewsRouter);

//Servidor HTTP
const httpServer = app.listen(port,()=>console.log(`Server listening on port ${port}`));

//Servidor Websocket
const io = new Server(httpServer);


const manager = new ProductsMongo("./dao/files/products.json");

//configuración webSocket
io.on("connection", async (socket) => {
	console.log("id: " + socket.client.conn.id);
	
	const items = await manager.getProducts();
	socket.emit("itemShow", items);
	console.log(items)

	socket.on("item", async (product) => {
        try{
			//console.log(product)
            await manager.addProduct(product);
		    const items = await manager.getProducts();
			//console.log(items)
		    io.emit("itemShow", items);
        }catch(error){
            console.log({status: "error", data: error.message});
        }
		
	});
});



//configuracion del chat
const chatService = new ChatMongo();
io.on("connection",async(socket)=>{
    const messages = await chatService.getMessages();
    io.emit("msgHistory", messages);

    //recibir el mensaje del cliente
    socket.on("message",async(data)=>{
        await chatService.addMessage(data);
        const messages = await chatService.getMessages();
        io.emit("msgHistory", messages);
    });
});
