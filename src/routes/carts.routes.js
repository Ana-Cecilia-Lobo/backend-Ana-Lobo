import {Router} from "express";
import {CartsController} from "../controller/carts.controller.js";
import {ownCart} from "../middlewares/auths.js"

const router = Router();

//Ruta principal api/cart


router.post("/", CartsController.createCart);

router.get("/:cid", CartsController.getCart);

router.post("/:cid/product/:pid", ownCart, CartsController.addProduct);

router.delete("/:cid/product/:pid", ownCart, CartsController.deleteProduct);

router.put("/:cid", ownCart, CartsController.updateCart);

router.put("/:cid/product/:pid", ownCart, CartsController.updateQuantity);

router.delete("/:cid", ownCart, CartsController.deleteCart);

export {router as CartRouter};