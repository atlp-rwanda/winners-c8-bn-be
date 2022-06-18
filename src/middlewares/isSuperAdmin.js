import jwt from 'jsonwebtoken';
import 'dotenv/config';
<<<<<<< HEAD
import RoleService from "../services/roleServices";


export function isSuperAdmin (req, res, next){

=======
import Protection from "../middlewares/hash";
const { verifyToken } = Protection;

export function isSuperAdmin (req, res, next){
>>>>>>> 7eae1f7 (feat(user-roles-settings): implement user role assigning)
    const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if(token == null) return res.status(401).json({message:'Token is required'})

<<<<<<< HEAD
	jwt.verify(token, process.env.TOKEN_SECRET, async (error, user)=>{
      
		if(error) return res.status(403).json({message:"Invalid Token"});

		const findRoleById = await RoleService.findRoleById(user.user_role);

        if(findRoleById.roleName !== 'super-admin'){
=======
	// const data = verifyToken(token);
	// console.log(data);
	jwt.verify(token, process.env.TOKEN_SECRET, (error, user)=>{
       
		if(error) return res.status(403).json({message:"Invalid Token"})
		// console.log(user);
		
        if(user.user_role !== "013dddd7-2769-4de6-8fc3-7aa527114879"){
>>>>>>> 7eae1f7 (feat(user-roles-settings): implement user role assigning)
            return res.status(403).json({status: 403, message: 'super admin is only allowed to perform this task', });
        }

		req.user = user;
		next();
	})

<<<<<<< HEAD
}
=======


}
>>>>>>> 7eae1f7 (feat(user-roles-settings): implement user role assigning)
