import { Role } from '../database/models';

class RoleService{
    
    static findRoleById = async(roleId)=>{
        const role = await Role.findOne({where:{id:roleId}})
        if(role == null){
            return null;
        }
        return role;
    }
}

export default RoleService