import jwt from "jsonwebtoken";
import Util from "../helpers/utils";

const util = new Util();
class authorization {
  static async userAuthorize(req, res, next) {
    try {
      const authToken = req.headers;
      if (!authToken.authorization) {
        util.setError(401, "Token Required");
        return util.send(res);
      }
      const token = authToken.authorization.replace("Bearer ", "");

      const user = jwt.verify(token, process.env.PRIVATE_KEY);
      const userRoleId = user.roleId;

      if (userRoleId === 1) {
        req.userInfo = user;
        return next();
      }
      const { permission_name } = authToken;
      const permissions = await rolePermServices.findPermByRolrId(userRoleId);
      const permissionIds = [];
      permissions.forEach((element) => {
        permissionIds.push(element.permission_id);
      });

      const permission = await permissionServices.findPermIbByPermName(
        permission_name
      );
      const permissionId = permission.id;
      const allowed = permissionIds.indexOf(permissionId);

      if (allowed === -1) {
        util.setError(401, "you don't have authorization to perform this task");
        return util.send(res);
      }
      req.userInfo = user;

      return next();
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

export default authorization;
