import { jwt } from "jsonwebtoken";
import errorResponse from "../utils/error";
import successResponse from "../utils/success";
// eslint-disable-next-line consistent-return

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token)
      return successResponse(res, 401, "Access denied. No token provided!");
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, 409, "Invalid token");
  }
};
// Assigned to Sosthene
// const users = await User.findOne({
//   where: { uuid: uuid }
// });
// if (!users) {
//     return error('You are logged out! Please Log in', res);
// }

export default verifyToken;
