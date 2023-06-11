import { Router } from "express";
import { userModel } from "../dao/models/user.models.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();


//registro
router.post("/signup", passport.authenticate("signupStrategy",{
    failureRedirect:"/api/sessions/signup-failed"
}) , (req,res)=>{
    //proceso exitoso de registro
    res.send('<div>usuario registrado, <a href="/login">ir al login</a></div>');
});

router.get("/signup-failed",(req,res)=>{
    res.send('<div>Hubo un error al registrar el usuario, <a href="/signup">intente de nuevo</a></div>');
});

//iniciar sesion

router.post("/login", passport.authenticate("loginStrategy",{
    failureRedirect:"/api/sessions/login-failed"
}) , (req,res)=>{
    res.redirect("/profile");
});

router.get("/login-failed",(req,res)=>{
    res.send('<div>Hubo un error al loguear el usuario, <a href="/login">intente de nuevo</a></div>')
});


//ruta para registro con github
router.get("/github",passport.authenticate("githubSignup"));

router.get("/github-callback",
    passport.authenticate("githubSignup",{
        failureRedirect:"/api/sessions/signup-failed"
    }),
    (req,res)=>{
        res.redirect("/profile");
    }
);

//cerrar sesion
router.get("/logout",(req,res)=>{
    req.logOut(error=>{
        if(error){
            return res.send('no se pudo cerrar sesion, <a href="/profile">ir al perfil</a>');
        } else {
            req.session.destroy(err=>{
                if(err) return res.send('no se pudo cerrar sesion, <a href="/profile">ir al perfil</a>');
                res.redirect("/")
            });
        }
    })
});


export {router as authRouter};