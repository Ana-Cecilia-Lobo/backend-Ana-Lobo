import express from "express";
import {ProductRouter} from "./routes/products.routes.js";
import { CartRouter } from "./routes/carts.routes.js";

const app = express();
const port = 8080; 

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//rutas
app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter);


app.listen(port,()=>console.log(`Server listening on port ${port}`));

