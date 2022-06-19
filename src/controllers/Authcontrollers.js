/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
<<<<<<< HEAD
import "dotenv/config";
=======
>>>>>>> bedd47e7b64561719e31406867d798c75b0d3392
import UserService from "../services/user";
import errorResponse from "../utils/error";
import successResponse from "../utils/success";
import Protection from "../middlewares/hash";
<<<<<<< HEAD
import sendVerificationEmail from "../helpers/sendVerificationEmail";

const { hashPassword, checkPassword, signToken, verifyToken } = Protection;
const {
  createUser,
  checkUser,
  createUserSession,
  deleteSession,
  verifyUserAccount,
} = UserService;
=======
import "dotenv/config";

const { hashPassword, checkPassword, signToken } = Protection;
const { createUser, checkUser, createUserSession, deleteSession } = UserService;
>>>>>>> bedd47e7b64561719e31406867d798c75b0d3392
/**
 * @description - This class is used to handle the user authentication
 */
class Auth {
  static async signup(req, res) {
    try {
      const { password } = req.body;

      const exists = await checkUser(req.body.email);
      if (exists) {
        return errorResponse(res, 409, "Ooops! User already exists!");
      }
      const user = await createUser({
        ...req.body,
        password: hashPassword(password),
      });

      const { id, email, user_role } = user;

      const token = await signToken({ id, email, user_role });

      await sendVerificationEmail(email, token);

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
        return errorResponse(res, 404, "User not found!");
      }
      if (!checkPassword(password, user.password)) {
        return errorResponse(res, 409, "Invalid credentials");
      }
      if (!user.verified) {
        return errorResponse(res, 403, `User email is not verified!`);
      }
      const token = await signToken({
        id: user.id,
        email: user.email,
        user_role: user.user_role,
      });
      await createUserSession({
        userId: user.id,
        token,
        loginDevice: req.agent,
        lastSessionTime: new Date(),
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
  static async signout(req, res) {
    try {
      if (!req.user || !req.header.token)
        errorResponse(res, 409, "User not loggedIn");
      await deleteSession({ userId: req.user.id, token: req.header.token });
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

      return successResponse(res, 201, "User verified successfully", results);
    } catch (error) {
      return errorResponse(
        res,
        500,
        `Ooops! Unable to verify User ${error.message}`
      );
    }
  }
}

export default Auth;
