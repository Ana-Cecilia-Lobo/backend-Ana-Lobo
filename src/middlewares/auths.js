//Middleware session}
const checkSession = (req, res, next)=>{
    if(req.user){
        next();
    } else {
        res.send('Debes iniciar sesion para acceder a este recurso <a href="/singup">intente de nuevo</a></div>');
    } 
};

const canUpdateProducts = (req, res, next)=>{
   const user = req.user.rol
   //console.log(user)
    if(user === "admin"){
        next()
    }else{
        res.send('No tienes los permisos para continuar esta acción <a href="/home">Volver al home</a></div>');
    }
}

const canChat = (req, res, next)=>{
    const user = req.user.rol;
    //console.log(user)
    if(user === "user"){
        next();
    }else{
        res.send('No tienes los permisos para continuar esta acción <a href="/home">Volver al home</a></div>');
    }
}
const ownCart = (req, res, next)=>{
    const user = req.user.rol;
    if(user === "user"){
        const Owncart = req.user.cart;
        const cart = req.params.cid;
        //console.log(Owncart, cart)
        if(Owncart == cart){
            next();
        }else{
            res.send('No tienes los permisos para modificar este carrito <a href="/home">Volver al home</a></div>');
        }
    }else{
        res.send('No tienes los permisos para continuar esta acción <a href="/home">Volver al home</a></div>');
    }
}




export {checkSession, canUpdateProducts, canChat, ownCart}