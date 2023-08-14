import { UsersService } from "../repository/users.services.js";

export class UsersController{

    static updateUser = async(req,res)=>{
        try{ 
            const userId = req.params.uid

            const user = await UsersService.getUserById(userId);
            if(!user){
                return res.send("El usuario no existe, <a href='/singup'>Registrarse</a>");
            }

            let rol;
            if(user.rol == "user"){
                rol = "premium"
            }else if(user.rol == "premium"){
                rol = "user"
            }else{
                return res.send("No puede realizar esta accion, <a href='/home'>Volver al inicio</a>");
            }
            const newUser = {
                ...user,
                rol:rol
            };

            const update = await UsersService.updateUser(userId, newUser )

            res.send(update)

        } catch (error) {
            logger.error(error.message)
            res.status(400).json({status:"error", message:error.message});
        }
    }
}