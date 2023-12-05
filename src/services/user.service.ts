import { User } from "../entity/User";
import IRole from "../interfaces/role.interface";
import {IUserLogin} from "../interfaces/user.interface";
import jwt from "jsonwebtoken"
import config from "../config"
import {IUserRegister} from "../interfaces/user.interface";

class UserService{
    async findUser(user: IUserLogin | IUserRegister){
        try{
            const requestCheckUser = await User.findOneBy({
                email: user.email
            })
            return requestCheckUser
        }
        catch (error){
            console.log("Error with searching user in DB", error)
        }
    }

    async getUserById(userId: number){
        try{
            const user = await User.findOneBy({
                user_id: userId
            })
            return user
        }
        catch(error){
            console.log("Error with searching user in DB", error)
        }
    }

    async getUsers(){
        try{
            const users = await User.find()
            return users
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }

    async createNewUser(user: IUserRegister){
        try{
            const newUser = User.create({
                firstname: user.firstname,
                surname: user.surname,
                email: user.email,
                password: user.password
            })
            await newUser.save()
            return newUser
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }

    async deleteUserById(id: number){
        try{
            const user = await this.getUserById(id)
            await User.remove(user)
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }

    generateAccessToken = (id: number, role: string) => {
        const payload: IRole = {
            userId: id,
            role: role
        }
        return jwt.sign(payload, config.secretKey, {expiresIn: '24h'})
    }
}

export default new UserService()