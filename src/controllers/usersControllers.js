import models from "../database/models"

export class UserControllers{

    static async assignRole(req, res){

    const {email, roleId} = req.body
    try {
        const user = await models.User.findOne({where:{email}})
        if(user == null){
            return res.status(404).json({status:404, message:"user doesn't exist"});
        }else{
            const role = await models.Role.findOne({where:{id:roleId}})
            if(role){
                user.roleId = role.id;
                await user.save();
                return res.status(200).json({status:200, message:"User role updated succesfully!"});
            }
            return res.status(404).json({status:404, message:"role doesn't exist"});
        }
        
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
       
    }

    static async getUsers(req, res){
        
        try {
            const users = await models.User.findAll({include: 'role'});
            return res.status(200).json({status:200, users})
            
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }
}