import jwt from 'jsonwebtoken'
const signAccessToken = (userInfo) => {
	try {
		const payload = {
			id: userInfo.id,
			email: userInfo.email,
			firstName: userInfo.firstName,
			lastName: userInfo.lastName,
			role: userInfo.role,
			manager: userInfo.manager,
		};
		const token = jwt.sign({ payload }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: process.env.TOKEN_EXPIRE,
		});
		// client.set(payload.id, token);
		return token;
	} catch (error) {
		return error;
	}
};

export default signAccessToken;
