import {Router} from "express";
import { UsersController } from "../controller/users.controller.js";
import { uploadUserDoc } from "../utils.js";
import { checkSession } from "../middlewares/auths.js";
const router = Router();

router.get("/premium/:uid", checkSession, UsersController.updateUser);

router.delete("/delete-user", UsersController.deleteUser);

router.post("/:uid/documents", checkSession, uploadUserDoc.fields([{name:"identificacion",maxCount:1},{name:"domicilio",maxCount:1}, {name:"estadoDeCuenta",maxCount:1}]), UsersController.uploadDocuments)
export {router as UsersRouter};