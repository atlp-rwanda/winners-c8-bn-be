import UserService from '../services/user';
import errorResponse from '../utils/error';
import successResponse from '../utils/success';
import encryption from '../middlewares/hash';
import 'dotenv/config';

const { createUser, checkUser } = UserService;
const { hashPassword, signToken } = encryption;

class Auth {
	static async signup(req, res) {
		try {
			const { password } = req.body;

			const exists = await checkUser(req.body.email);
			if (exists) {
				return errorResponse(res, 409, `Ooops! User already exists!`);
			}
			const user = await createUser({
				...req.body,
				password: hashPassword(password),
			});

			const { id, email, user_role } = user;

			const token = await signToken({ id, email, user_role });
			return successResponse(
				res,
				201,
				'User registered successfully',
				token,
			);
		} catch (error) {
			return errorResponse(
				res,
				500,
				`Ooops! Unable to register User ${error.message}`,
			);
		}
	}
}

export default Auth;
