import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";

import { __dirname } from "./utils.js";
import { viewsRouter } from "./routes/views.routes.js";
import { ProductRouter } from "./routes/products.routes.js";
import { CartRouter } from "./routes/carts.routes.js";
import { authRouter } from "./routes/auths.routes.js";
import {ChatMongo} from "./dao/managers/mongo/chat.mongo.js";
import { ProductsMongo } from "./dao/managers/mongo/ProductManager.mongo.js";
import { configuracion } from "./config/config.js"; 

const app = express();
const port = configuracion.server.port; 

 
//Middlewares
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//configuración session
app.use(session({
    store: MongoStore.create({
        mongoUrl: configuracion.mongo.url
    }),
    secret:configuracion.server.secretSession,
    resave: true,
    saveUnitialized: true,
}))

//confiuguracion passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


//configuracion del motor de plantillas
app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set("views",path.join(__dirname,"/views"));
app.set('view engine', '.hbs');


//rutas
app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter);
app.use("/", viewsRouter);
app.use("/api/sessions", authRouter)

//Servidor HTTP
const httpServer = app.listen(port,()=>console.log(`Server listening on port ${port}`));

//Servidor Websocket
const io = new Server(httpServer);


const manager = new ProductsMongo();
//configuración webSocket
io.on("connection", async (socket) => {
	console.log("id: " + socket.client.conn.id);
	
	const items = await manager.getProducts();
	socket.emit("itemShow", items);
	//console.log(items)

	socket.on("item", async (product) => {
        try{
            await manager.addProduct(product);
            const items = await manager.getProducts();
            io.emit("itemShow", items);
             
			//console.log(items)
		    
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

