import { User } from '../database/models';

class UserService {
	static createUser = async (data) => {
		const user = await User.create(data);
		return user;
	};

	static checkUser = async (params) => {
		const user = await User.findOne({ params });

		if (user) {
			throw new Error('User already exists');
		}
		return user;
	};
}

export default UserService;
