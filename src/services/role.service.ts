import { Role } from "../entity/Role"
import IRole from "../interfaces/role.interface"

class RoleService{
    async setRole(userRole: IRole){
        try{
            const roleExist = await Role.findOneBy({
                user_id: userRole.userId
            })
            if(roleExist != null){
                roleExist.role = userRole.role
                await roleExist.save()
                return roleExist
            }
            else{
                const role = Role.create({
                    user_id: userRole.userId,
                    role: userRole.role
                })
                await role.save()
                return role
            }
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }

    async getRoles(){
        try{
            const roles = await Role.find()
            return roles
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }

    async getRole(userId: number){
        try{
            const role = await Role.findOneBy({
                user_id: userId
            })
            return role.role
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }

    async deleteRole(userId: number){
        try{
            const user = await Role.findOneBy({
                user_id: userId
            })
            await Role.remove(user)
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }
}

export default new RoleService()