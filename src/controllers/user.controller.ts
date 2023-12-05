import bcrypt from "bcryptjs"
import {validationResult} from "express-validator"
import { Request, Response } from "express"
import IRole from "../interfaces/role.interface"
import {IUserRegister} from "../interfaces/user.interface"
import {IUserLogin} from "../interfaces/user.interface"
import userService from "../services/user.service"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"
import roleService from "../services/role.service"

class UserController{
    async registerUser(req: Request, res: Response){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    message: "Errors registration", errors
                })
            }
            const user: IUserRegister = {
                firstname: req.body.firstname,
                surname: req.body.surname,
                email: req.body.email,
                password: req.body.password
            }

            if(await userService.findUser(user)){
                return res.status(400).json({
                    message: 'User with this email already exists'
                })
            }
            
            const hashPassword = bcrypt.hashSync(user.password, 7)
            user.password = hashPassword

            const newUser = await userService.createNewUser(user)
            const userRole: IRole = {
                userId: newUser.user_id,
                role: "USER"
            }
            await roleService.setRole(userRole)

            return res.json(`The user with id = ${newUser.user_id} and role = ${userRole.role} has been successfully registered`);
            }
        catch(error){
            console.log(error);
            return res.status(400).json({message: 'Registration error'})
        }
    }

    async loginUser(req: Request, res: Response){
        try{
            const user: IUserLogin = {
                email: req.body.email,
                password: req.body.password
            }
            const existUser = await userService.findUser(user)
            if(!existUser){
                return res.status(400).json({
                    message: 'Invalid password or email'
                })
            }
            const validPassword = bcrypt.compareSync(user.password, existUser.password)
            if(!validPassword){
                return res.status(400).json({
                    message: 'Invalid password'
                })
            }
            const userRole = await roleService.getRole(existUser.user_id)
            const token = userService.generateAccessToken(existUser.user_id, userRole)

            return res.json({token})
        }
        catch(error){
            console.log(error);
            return res.status(400).json({message: 'Registration error'})
        }
    }

    async getUserById(req: Request, res: Response){
        try{
            const id = req.params.id
            const token = req.headers.authorization.split(' ')[1]
            const {user_id, role} = jwt.verify(token, config.secretKey) as JwtPayload
            if(id == user_id || role == "ADMIN"){
                const user = await userService.getUserById(Number(id))
                return res.json(user)
            }
            else{
                return res.status(400).json({message: "You don't have permissions!"})
            }
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }

    async getUsers(req: Request, res: Response){
        try{
            const users = await userService.getUsers()
            return res.json(users)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }

    async deleteUser(req: Request, res: Response){
        try{
            const {userId} = req.body
            userService.deleteUserById(Number(userId))
            return res.json(`User with id = ${userId} was deleted`)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }
}

export default new UserController()