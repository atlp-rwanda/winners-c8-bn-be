import { invalid } from 'joi';
import { Role } from '../database/models';

class RoleService{
    
    static findRoleById = async(roleId)=>{
        try {
            const role = await Role.findOne({where:{id:roleId}})
            if(role == null){
                return null;
            }
            return role;
            
        } catch (error) {
            return false
        }
        
    }

    static findAllRoles = async()=>{
        const roles = await Role.findAll()
        if(roles.length >= 1){
            return roles;
        }
        return null;
    }
}

export default RoleService