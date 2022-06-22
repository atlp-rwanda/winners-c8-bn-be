/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import "dotenv/config";
import UserService from "../services/user";
import errorResponse from "../utils/error";
import successResponse from "../utils/success";
import Protection from "../middlewares/hash";
import sendVerificationEmail from "../helpers/sendVerificationEmail";

const { hashPassword, checkPassword, signToken, verifyToken } = Protection;
const { createUser, checkUser, deleteSession, verifyUserAccount } = UserService;
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
      await user.createUserSession({
        token,
        deviceType: req.headers["user-agent"],
        loginIp: req.ip,
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
      if (!req.user || !req.headers["x-auth-token"])
        errorResponse(res, 409, "User not logged in");
      const token = req.headers.authorization.split(" ")[1];
      await deleteSession({ userId: req.user.id, token });
      return successResponse(res, 200, "User logged out successful", token);
    } catch (error) {
      return errorResponse(
        res,
        500,
        `Ooops! Unable to signout  the  User ${error.message}`
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
  static async getUserSessions(request, response) {
    try {
      if (!request.user)
        return errorResponse(response, 409, "You need to login");
      const sessions = await request.user.getUserSessions();
      return successResponse(
        response,
        200,
        "User session return successfully",
        sessions.map((session) => session.dataValues)
      );
    } catch (error) {
      return errorResponse(
        response,
        500,
        `Ooops! get the user sessions ${error.message}`
      );
    }
  }
  static async removeSession(request) {
    try {
      const { sessionId } = request.params;
      if (!request.user) return errorResponse(res, 409, "You need to login");

      const sessions = request.user.removeUserSession(sessionId);
      return successResponse(
        res,
        200,
        "User session removed successful",
        sessions
      );
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
