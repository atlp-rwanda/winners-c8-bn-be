import { User, Role } from '../database/models';

class UserService {
	static createUser = async (data) => {
		const user = await User.create(data);
		return user;
	};

	static checkUser = async (email) => {
		const user = await User.findOne({ where:{email} });
		return user;
	};

	static verifyUserAccount = async (email) => {
		const data = await User.update({
							verified: true
						}, {
							where: { email }
						});
		return data;
	};

	static updateRole = async (email, roleId) => {
		const user = await User.findOne({where: { email }});
		const newRole = await Role.findOne({ where: { id: roleId } });
		if (newRole == null) {
			return null;
		}
		user.user_role = newRole.id;
		await user.save();
		return user;
		};
		
	
}

export default UserService;
