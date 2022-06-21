import jwt from 'jsonwebtoken';
import 'dotenv/config';
import RoleService from "../services/roleServices";


export function isSuperAdmin (req, res, next){

    const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if(token == null) return res.status(401).json({message:'Token is required'})

	jwt.verify(token, process.env.TOKEN_SECRET, async (error, user)=>{
      
		if(error) return res.status(403).json({message:"Invalid Token"});

		const findRoleById = await RoleService.findRoleById(user.user_role);

        if(findRoleById.roleName !== 'super-admin'){
            return res.status(403).json({status: 403, message: 'super admin is only allowed to perform this task', });
        }

		req.user = user;
		next();
	})

}
