import {Router} from "express";
import {CartsController} from "../controller/carts.controller.js";
import {ownCart, addOwnProduct} from "../middlewares/auths.js"

const router = Router();

//Ruta principal api/cart


router.post("/", CartsController.createCart);

router.get("/:cid", CartsController.getCart);

router.post("/:cid/product/:pid", ownCart, addOwnProduct, CartsController.addProduct);

router.delete("/:cid/product/:pid", ownCart, CartsController.deleteProduct);

router.put("/:cid", ownCart, addOwnProduct, CartsController.updateCart);

router.put("/:cid/product/:pid", ownCart, addOwnProduct, CartsController.updateQuantity);

router.delete("/:cid", ownCart, CartsController.deleteCart);

router.post("/:cid/purchase", ownCart, CartsController.purchase)

export {router as CartRouter};