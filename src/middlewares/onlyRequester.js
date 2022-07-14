import 'dotenv/config';
import RoleService from "../services/roleServices";

export async function isRequester (req, res, next){

	const user = req.user;

	const findRoleById = await RoleService.findRoleById(user.user_role);
	if(findRoleById.roleName !== 'requester'){
		return res.status(403).json({status: 403, message: 'Only Requesters are allowed to perform this task', });
	}
	req.user = user;
	next();
}