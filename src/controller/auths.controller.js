//import { userModel } from "../dao/models/user.models.js";
//import { createHash, isValidPassword } from "../utils.js";


//Sing up exitoso
export const singUpExitoso = (req,res)=>{
    //proceso exitoso de registro
    res.send('<div>usuario registrado, <a href="/login">ir al login</a></div>');
}

//Sing up failed
export const singUpFailed = (req,res)=>{
    res.send('<div>Hubo un error al registrar el usuario, <a href="/signup">intente de nuevo</a></div>');
}

//Log in exitoso
export const logInExistoso = (req,res)=>{
    res.redirect("/profile");
}

//Log in failed
export const logInFailed = (req,res)=>{
    res.send('<div>Hubo un error al loguear el usuario, <a href="/login">intente de nuevo</a></div>')
}

//Sing Up git-hub
export const singUpGitHub = (req,res)=>{
    res.redirect("/profile");
}

//Log out
export const logOut = (req,res)=>{
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
}