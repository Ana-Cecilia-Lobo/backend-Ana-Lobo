export const generateUserErrorInfo = (user)=>{
    return `
        Uno o mas campos no estas completos.
        Lista de campos requeridos:
        name:Este campo recibe string, pero se recibio ${user.first_name},
        email:Este campo recibe string, pero se recibio ${user.email},
        password:Este campo recibe string, pero se recibio ${user.password},
    `
};