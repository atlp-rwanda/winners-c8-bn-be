import 'dotenv/config';
import RoleService from "../../services/roleServices";

export async function isTravelAdmin (req, res, next){

	const user = req.user;

	const findRoleById = await RoleService.findRoleById(user.user_role);
	if(!((findRoleById.roleName == 'travel-admin')|(findRoleById.roleName == 'super-admin'))){
		return res.status(403).json({status: 403, message: 'travel and super admins are the only ones allowed to perform this task', });
	}

	next();
}
