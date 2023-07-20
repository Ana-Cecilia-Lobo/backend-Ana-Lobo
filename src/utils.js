import bcrypt from "bcrypt";
import path from 'path';
import { fileURLToPath } from 'url';
import { Faker, faker, es} from "@faker-js/faker"

const customFaker = new Faker({
    locale:[es]
});

const {commerce, image, string, datatype} = customFaker;

//generar productos
export const generateProduct = ()=>{
    return {
        title:commerce.product(),
        description:commerce.productAdjective(),
        price:commerce.price({ min: 10, max: 999 }),
        code:string.alphanumeric(10),
        status:datatype.boolean(0.5),
        thumbnail:image.urlPicsumPhotos(),
        stock:parseInt(string.numeric(2)),
        category:commerce.department()
        
    }
};

//const product = generateProduct();
//console.log(product);

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

//funcion para crear el hash
export const createHash = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync());
};

//funcion para comparar las contraseñas
export const isValidPassword = (password, user)=>{
    return bcrypt.compareSync(password,user.password);
};