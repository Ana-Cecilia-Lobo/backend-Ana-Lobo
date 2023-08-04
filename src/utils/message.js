import { configuracion } from "../config/config.js";
import jwt  from "jsonwebtoken";
import nodemailer from "nodemailer";

export const generateEmailToken = (email, expireTime)=>{
    const token = jwt.sign({email}, configuracion.server.secretToken, {expiresIn: expireTime});
    return token;
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth:{
        user: configuracion.gmail.adminEmail,
        pass: configuracion.gmail.adminPass
    },
    secure: false,
    tls:{
        rejectUnauthorized: false
    }
});

export const sendRecoveryEmail = async(userEmail,token)=>{

    const link = `http://localhost:8080/reset-password?token=${token}`;

    await transporter.sendMail({

        from:"E-commerce Ana",
        to: userEmail,
        subject:"Restablecer contraseña",
        html:`
            <div>
                <h2>Hola, estas restableciendo tu contraseña</h2>
                <p>Da clic para restablecer tu contraseña</p>
                <a href="${link}">
                    <button>Restablecer mi contraseña</button>
                </a>
            </div>
        `
    })
}