import errorResponse from "../utils/error";
import successResponse from "../utils/success";
import { User } from "../database/models";
import Protection from "./hash";
// eslint-disable-next-line consistent-return

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token)
      return errorResponse(res, 401, "Access denied. No token provided!");
    const decoded = await Protection.verifyToken(token);
    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) return errorResponse(res, 401, "Access denied. User not found");
    const session = await user.getUserSessions({ where: { token } });
    if (!session.length == 1)
      return errorResponse(res, 401, "Access denied. Invalid session!");
    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, 401, "Access denied. Invalid token");
  }
};
export default isAuthenticated;
