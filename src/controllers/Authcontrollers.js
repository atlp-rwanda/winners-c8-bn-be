import UserService from '../services/user';
import errorResponse from '../utils/error';
import successResponse from '../utils/success';
import encryption from '../middlewares/hash';
import 'dotenv/config';
import sendVerificationEmail from '../helpers/sendVerificationEmail'

const { createUser, checkUser } = UserService;
const { hashPassword, signToken } = encryption;

const { verifyToken } = encryption;
const { verifyUserAccount } = UserService;

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

			await sendVerificationEmail(email,token);

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
	static async verifyUser(req, res) {

		let data = {};
		try {
			data = await verifyToken(req.params.token);
		} catch (err) {
			return errorResponse(res, 400, `Invalid or expired Token.`);
		}
		
		try {
			
			const exists = await checkUser(data.email);
			if (!exists) {
				return errorResponse(res, 409, `Ooops! User does not exist!`);
			}
			const results = await verifyUserAccount(data.email);

			return successResponse(
				res,
				201,
				'User verified successfully',
				results,
			);
		} 
		catch (error) {
			return errorResponse(
				res,
				500,
				`Ooops! Unable to verify User ${error.message}`,
			);
		}
	}
}

export default Auth;
