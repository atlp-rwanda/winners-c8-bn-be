import { User } from '../database/models';

class UserService {
	static createUser = async (data) => {
		const user = await User.create(data);
		return user;
	};

	static checkUser = async (email) => {
		const user = await User.findOne({ where:{email} });
		return user;
	};
}

export default UserService;
