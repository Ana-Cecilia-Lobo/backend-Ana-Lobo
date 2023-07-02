import {Router} from "express";
import { getProducts, getProductsID, addProducts, updateProducts, deleteProducts } from "../controller/products.controller.js";

const router = Router();

//Ruta principal api/products

//Obtener productos
router.get("/", getProducts);

//Obtener productos por id
router.get("/:pid", getProductsID);

//Agregar productos
router.post("/", addProducts);

//Modificar productos
router.put("/:pid", updateProducts);

//Eliminar productos
router.delete("/:pid", deleteProducts);

export {router as ProductRouter};