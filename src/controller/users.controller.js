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
            if(user.rol == "user" && user.status == "Completo"){
                rol = "premium"
            }else if(user.rol == "premium"){
                rol = "user"
            }else{
                return res.send("No puede realizar esta accion, <a href='/'>Volver al inicio</a>");
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

    //para test
    static deleteUser = async(req,res)=>{
        try{ 
            const userId = req.params.uid

            const user = await UsersService.deleteUser(userId);
            res.send(user)

        } catch (error) {
            logger.error(error.message)
            res.status(400).json({status:"error", message:error.message});
        }
    }

    static uploadDocuments = async(req,res)=>{
        try{ 
            const userId = req.params.uid

            const user = await UsersService.getUserById(userId);
            if(!user){
                return res.send("El usuario no existe, <a href='/singup'>Registrarse</a>");
            }

            const identificacion = req.files["identificacion"]?.[0] || null;
            const domicilio = req.files["domicilio"]?.[0] || null;
            const estadoDeCuenta = req.files["estadoDeCuenta"]?.[0] || null;
            const docs = user.documents;
            if(identificacion){
                docs.push({name:"identificacion", reference:identificacion.filename})
            }
            if(domicilio){
                docs.push({name:"domicilio", reference: domicilio.filename})
            }
            if(estadoDeCuenta){
                docs.push({name:"estadoDeCuenta", reference: estadoDeCuenta.filename})
            }
            console.log(docs)
            
            user.documents = docs;
            const id = docs.some(e => e.name == 'identificacion');
            const dom = docs.some(e => e.name == 'domicilio');
            const est = docs.some(e => e.name == 'estadoDeCuenta');

            let complete = false
            if(id == true && dom == true && est == true){
                complete = true
            }

            if(complete){
                user.status = "Completo";
            } else {
                user.status = "Incompleto";
            }
            await UsersService.updateUser(user._id,user);
            res.json({status:"success", message:"solicitud procesada"});

        } catch (error) {
            console.log(error.message)
            res.status(400).json({status:"error", message:error.message});
        }
    }
}