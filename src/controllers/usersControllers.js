import UserService from "../services/user";

export class UserControllers{

    static async assignRole(req, res){

    const {email, roleId} = req.body
    try {
        const user = await UserService.checkUser(email);
<<<<<<< HEAD
        if(user == null) return res.status(404).json({status:404, message:"user doesn't exist"});
=======
        if(user == null){
            res.status(404).json({status:404, message:"user doesn't exist"});
            return false;
        }
>>>>>>> 7eae1f7 (feat(user-roles-settings): implement user role assigning)

        const updatedUser = await UserService.updateRole(email, roleId);

        if (updatedUser == null) {
            return res.status(400).json({
            status: 400,
            message: 'role you want to assign does not exist',
            });
        }
        return res.status(200).json({
            status: 200,
            message:"User role updated succesfully!",
            payload: {
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            user_role: updatedUser.user_role,
            },
        });
        
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
       
    }

<<<<<<< HEAD
}
=======
}
>>>>>>> 7eae1f7 (feat(user-roles-settings): implement user role assigning)
