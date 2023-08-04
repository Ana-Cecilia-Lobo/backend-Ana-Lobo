import { usersDAO } from "../dao/factory.js";

export class UsersService{
    static async getUserByEmail(email){
        return usersDAO.getUserByEmail(email);
    };

    static async getUserById(userId){
        return usersDAO.getUserById(userId);
    };

    static async saveUser(user){
        return usersDAO.saveUser(user);
    };

    static async updateUser(userId,newInfo){
        return usersDAO.updateUser(userId,newInfo);
    };
}