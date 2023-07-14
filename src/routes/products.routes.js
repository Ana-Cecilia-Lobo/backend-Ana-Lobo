import {Router} from "express";
import { ProductsController } from "../controller/products.controller.js";
import { canUpdateProducts } from "../middlewares/auths.js";

const router = Router();

//Ruta principal api/products

//Obtener productos
router.get("/", ProductsController.getProducts);

//Obtener productos por id
router.get("/:pid", ProductsController.getProductsID);

//Agregar productos
router.post("/", canUpdateProducts, ProductsController.addProducts);

//Modificar productos
router.put("/:pid", canUpdateProducts, ProductsController.updateProducts);

//Eliminar productos
router.delete("/:pid", canUpdateProducts, ProductsController.deleteProducts);

export {router as ProductRouter};