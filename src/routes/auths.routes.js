import { Router } from "express";
import { userModel } from "../dao/models/user.models.js";

const router = Router();

//registro
router.post("/signup", async(req,res)=>{
    try {
        const userForm = req.body;

        const user = await userModel.findOne({email:userForm.email});
        if(!user){

            const userCreated = await userModel.create(userForm);
            console.log(userCreated)
            res.send('<div>usuario registrado, <a href="/login">ir al login</a></div>');
        } else {
            res.send('<div>usuario ya registrado, <a href="/singup">intente de nuevo</a></div>');
        }
    } catch (error) {
        res.send('<div>Hubo un error al registrar el usuario, <a href="/singup">intente de nuevo</a></div>')
    }
});

//iniciarsesioni 
router.post("/login", async(req,res)=>{
    try {
        const userLoginForm = req.body;

        const userDB = await userModel.findOne({email:userLoginForm.email});
        if(userDB){

            if(userDB.password === userLoginForm.password){
                
                req.session.user={first_name:userDB.first_name, last_name:userDB.last_name, email:userDB.email};
                res.redirect("/profile");
            } else {
                res.send('<div>credenciales invalidas, <a href="/login">intente de nuevo</ahref=></div>');
            }
        } else {

            res.send('<div>usuario no registrado, <a href="/signup">registrarse</a> o <a href="/login">intente de nuevo</ahref=></div>');
        }
    } catch (error) {
        res.send('<div>Hubo un error al loguear el usuario, <a href="/login">intente de nuevo</a></div>')
    }
});

//cerrar sesion
router.get("/logout",(req,res)=>{
    req.session.destroy(err=>{
        if(err) return res.send('no se pudo cerrar sesion, <a href="/profile">ir al perfil</a>');
        res.redirect("/login")
    });
});


export {router as authRouter};