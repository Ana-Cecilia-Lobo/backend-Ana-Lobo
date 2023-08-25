import chai from "chai";
import supertest from "supertest";
import {app} from "../src/app.js"

const expect = chai.expect;
const requester = supertest(app)

describe("Test sessions", ()=>{
    
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
        expect(statusCode).to.be.equal(200)
    });
});