import passport from "passport";
import localStrategy from "passport-local";
import githubStrategy from "passport-github2"
import { userModel } from "../dao/models/user.models.js";
import { createHash, isValidPassword } from "../utils.js";


export const initializePassport = ()=>{
    passport.use("signupStrategy",new localStrategy(
        {
            usernameField:"email", 
            passReqToCallback:true,
        },
        async(req, username, password, done)=>{
            try {
                const userSignupForm = req.body;
                const user = await userModel.findOne({email:username});
                if(!user){
                    
                    const correo = userSignupForm.email;
    
                    if(correo == "adminCoder@coder.com"){
                        const newUser = {
                            first_name:userSignupForm.first_name,
                            last_name: userSignupForm.last_name,
                            age: userSignupForm.age,
                            email: userSignupForm.email,
                            password:createHash(password),
                            rol: "admin",
                        }
                        const userCreated = await userModel.create(newUser);
                        return done(null, userCreated);
                    }else{
                        const newUser = {
                            first_name:userSignupForm.first_name,
                            last_name: userSignupForm.last_name,
                            age: userSignupForm.age,
                            email: userSignupForm.email,
                            password:createHash(password),
                        }
                        const userCreated = await userModel.create(newUser);
                        return done(null, userCreated);
                    }
                } else {    
                    return done(null,false);
                }
            } catch (error) {
                return done(error);
            }
        }
    ));

    //extrategia de login
    passport.use("loginStrategy", new localStrategy(
        {
            usernameField:"email"
        },
        async(username, password, done)=>{
            try {
                const userDB = await userModel.findOne({email:username});
                if(userDB){
                    if(isValidPassword(password,userDB)){
                        return done(null,userDB);
                    } else {
                        return done(null, false)
                    }
                } else {
                    return done(null,false)
                }
            } catch (error) {
                return done(error);
            }
        }
    ));

//estrategia de registro con github
passport.use("githubSignup", new githubStrategy(
    {
        clientID:"Iv1.dc95194f2f9bcc63",
        clientSecret:"ccf40ca3dee2bda147e4aa69f15677b8c8089c5a",
        callbackUrl:"http://localhost:8080/api/sessions/github-callback"
    },
    async(accesstoken,refreshtoken,profile,done)=>{
        try {
            console.log("profile", profile);
            const user = await userModel.findOne({email:profile.username});
            if(!user){
            
                const newUser = {
                    first_name:profile.username,
                    last_name: "",
                    age: null,
                    email: profile.username,
                    password: createHash(profile.id),
                }
                const userCreated = await userModel.create(newUser);
                return done(null, userCreated);
                
            } else {
                return done(null,false);
            }
        } catch (error) {
            return done(error);
        }
    }
));


    //serializacion y deserializacion
    passport.serializeUser((user,done)=>{
        done(null,user._id); 
    });

    passport.deserializeUser(async(id,done)=>{
        const userDB = await userModel.findById(id);
        done(null,userDB); 
    });
}