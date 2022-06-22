import 'dotenv/config';
import RoleService from "../services/roleServices";

export async function isSuperAdmin (req, res, next){

	const user = req.user;

	const findRoleById = await RoleService.findRoleById(user.user_role);
	if(findRoleById.roleName !== 'super-admin'){
		return res.status(403).json({status: 403, message: 'super admin is only allowed to perform this task', });
	}

	next();
}

