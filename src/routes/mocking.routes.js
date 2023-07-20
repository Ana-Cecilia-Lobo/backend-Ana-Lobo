import {Router} from "express";
import { ProductsController } from "../controller/products.controller.js";

const router = Router();

//Mocking
router.get("/mockingproducts", ProductsController.mocking);

export {router as MockingRouter};