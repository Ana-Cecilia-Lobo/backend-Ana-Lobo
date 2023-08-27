import {Router} from "express";
import { UsersController } from "../controller/users.controller.js";
const router = Router();

router.get("/premium/:uid", UsersController.updateUser);

router.delete("/delete-user",UsersController.deleteUser);

export {router as UsersRouter};