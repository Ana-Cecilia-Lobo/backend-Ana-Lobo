import {Router} from "express";
import { createCart, getCart, addProduct, deleteProduct, updateCart, updateQuantity, deleteCart } from "../controller/carts.controller.js";

const router = Router();

//Ruta principal api/cart


router.post("/", createCart);

router.get("/:cid", getCart);

router.post("/:cid/product/:pid", addProduct);

router.delete("/:cid/product/:pid", deleteProduct);

router.put("/:cid", updateCart);

router.put("/:cid/product/:pid", updateQuantity);

router.delete("/:cid", deleteCart);

export {router as CartRouter};