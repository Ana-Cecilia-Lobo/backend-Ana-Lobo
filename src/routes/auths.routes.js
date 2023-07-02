import { Router } from "express";
import passport from "passport";
import { singUpExitoso, singUpFailed, logInExistoso, logInFailed, singUpGitHub, logOut } from "../controller/auths.controller.js";
const router = Router();


//registro
router.post("/signup", passport.authenticate("signupStrategy",{
    failureRedirect:"/api/sessions/signup-failed"
}) , singUpExitoso);

router.get("/signup-failed", singUpFailed);

//iniciar sesion
router.post("/login", passport.authenticate("loginStrategy",{
    failureRedirect:"/api/sessions/login-failed"
}) , logInExistoso);

router.get("/login-failed", logInFailed);


//ruta para registro con github
router.get("/github", passport.authenticate("githubSignup"));

router.get("/github-callback",
    passport.authenticate("githubSignup",{
        failureRedirect:"/api/sessions/signup-failed"
    }),
    singUpGitHub
);

//cerrar sesion
router.get("/logout", logOut);

export {router as authRouter};