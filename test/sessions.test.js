import chai from "chai";
import supertest from "supertest";
import {app} from "../src/app.js"

const expect = chai.expect;
const requester = supertest(app)

describe("Test sessions", ()=>{
    before(async function(){
        this.timeout(10000)
    })

    it("El endpoint post /singup debe permitir crear un usuario", async function(){
        const MockUser = {
            
            first_name: "Roberto",
            last_name: "Flores",
            age:20,
            email: "roberto@gmail.com",
            password: "1234"
        }

        const result = await requester.post("/api/sessions/signup").send(MockUser)
        const {statusCode} = result
        
        expect(statusCode).to.be.equal(200);

        const deleteMock = (await requester.delete("/api/users/delete-user"))
        const deleted = deleteMock
    });

    it("El endpoint post /login debe permitir logguear un usuario", async function(){
        const MockUser = {
            
            first_name: "Roberto",
            last_name: "Flores",
            age:20,
            email: "roberto@gmail.com",
            password: "1234"
        }

        const adduser = await requester.post("/api/sessions/signup").send(MockUser)

        const result = await requester.post("/api/sessions/login").send({email: MockUser.email, password: MockUser.password})
        
        const {text} = result
        expect(text).to.be.equal("Found. Redirecting to /profile");
        const deleteMock = (await requester.delete("/api/users/delete-user"))
        const deleted = deleteMock
    });

    it("El endpoint get /logout debe permitir cerrar la sesión de un usuario", async function(){
        const MockUser = {
            
            first_name: "Roberto",
            last_name: "Flores",
            age:20,
            email: "roberto@gmail.com",
            password: "1234"
        }

        const adduser = await requester.post("/api/sessions/signup").send(MockUser)
        const added = adduser;

        const createUser = await requester.post("/api/sessions/login").send({email: MockUser.email, password: MockUser.password})
        const created = createUser;

        const result =  await requester.get("/api/sessions/logout")

        const {text} = result
        expect(text).to.be.equal('Found. Redirecting to /');

        const deleteMock = await requester.delete("/api/users/delete-user")
        console.log(deleteMock.statusCode)
    });
});