import { Request, Response } from 'express';
import roleService from '../services/role.service';
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"
import IRole from '../interfaces/role.interface';

class RoleController{
    async setRole(req: Request, res: Response){
        try{
            const userRole: IRole = {
                userId: req.body.user_id,
                role: req.body.role
            }
            await roleService.setRole(userRole)
            return res.json("User role has been created")
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }

    async deleteUserRole(req: Request, res: Response){
        try{
            const {userId} = req.body
            roleService.deleteRole(Number(userId))
            return res.json(`Role user with id = ${userId} was deleted`)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }

    async getRoles(req: Request, res: Response){
        try{
            const roles = await roleService.getRoles()
            return res.json(roles)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }

    async getRole(req: Request, res: Response){
        try{
            const userId = req.params.id
            const token = req.headers.authorization.split(' ')[1]
            const {user_id, role} = jwt.verify(token, config.secretKey) as JwtPayload
            if(userId == user_id || role == "ADMIN"){
                const userRole = await roleService.getRole(Number(userId))
                return res.json(userRole)
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
}

export default new RoleController()