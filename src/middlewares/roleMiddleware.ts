import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"

import { Request, Response } from "express"

export default (roles) => {
    return (req: Request, res: Response, next) => {
        if (req.method === "OPTIONS"){
            next()
        }

        try{
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                return res.status(403).json({
                    message: "User is not logged in!"
                })
            }
            const {role: userRoles} = jwt.verify(token, config.secretKey) as JwtPayload
            let hasRole = false
            roles.forEach(role => {
                if(userRoles == role)
                    hasRole = true
            })
            if(!hasRole){
                return res.status(403).json({
                    message: "You don't have permissions!"
                })
            }
            next()
        }
        catch(error){
            console.log(error)
            return res.status(403).json({
                message: "User is not logged in!"
            })
        }
    }
}