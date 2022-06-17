import UserService from "../services/user";
import errorResponse from "../utils/error";
import successResponse from "../utils/success";
import Protection from "../middlewares/hash";
import "dotenv/config";
import sendVerificationEmail from '../helpers/sendVerificationEmail'

const { hashPassword, checkPassword, signToken } = Protection;
const { createUser, checkUser } = UserService;

const { verifyToken } = Protection;
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

      return successResponse(res, 201, "User registered successfully", token);
    } catch (error) {
      return errorResponse(
        res,
        500,
        `Ooops! Unable to register User ${error.message}`
      );
    }
  }
  static async signin(req, res) {
    try {
      const { password, email } = req.body;

      const user = await checkUser(email);
      if (!user) {
        return errorResponse(res, 404, `User not found!`);
      }
      if(!user.verified){
        return errorResponse(res, 403, `User email is not verified!`);
      }
      if (!checkPassword(password, user.password))
        return errorResponse(res, 409, `Invalid credentials`);
      const token = await signToken({
        id: user.id,
        email: user.email,
        user_role: user.user_role,
      });
      return successResponse(res, 200, "User loggedIn", token);
    } catch (error) {
      return errorResponse(
        res,
        500,
        `Ooops! Unable to login the  User ${error.message}`
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
