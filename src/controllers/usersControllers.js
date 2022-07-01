import RoleService from "../services/roleServices";
import UserService from "../services/user";
import error from "../utils/error";
import errorResponse from "../utils/error";
import successResponse from "../utils/success";

export class UserControllers {
  static async assignRole(req, res) {
    const { email, roleId } = req.body;

    try {
      const user = await UserService.checkUser(email);
      if (user == null)
        return res
          .status(404)
          .json({ status: 404, message: "user doesn't exist" });

      const role = await RoleService.findRoleById(roleId);
      if (role == false)
        return res
          .status(400)
          .json({ status: 400, message: "invalid role id" });

      const updatedUser = await UserService.updateRole(email, roleId);

      if (updatedUser == null) {
        return res.status(400).json({
          status: 400,
          message: "role you want to assign does not exist",
        });
      }
      return res.status(200).json({
        status: 200,
        message: "User role updated succesfully!",
        payload: {
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          user_role: updatedUser.user_role,
        },
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getRoles(req, res) {
    try {
      const roles = await RoleService.findAllRoles();
      if (roles == null)
        return res
          .status(404)
          .json({ status: 404, message: "no role yet to show!" });
      return res.status(200).json({ status: 200, roles });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async assignManager(req, res) {
    try {
      const managerId = req.body.managerId;
      const userEmail = req.body.email;

      const user = await UserService.checkUser(userEmail);
      if (user == null) {
        return errorResponse(res, 400, "User doen't exist");
      }

      const isManger = await UserService.checkManager(managerId);

      if (!isManger) {
        return errorResponse(res, 400, "User is not a manager");
      }

      const result = await UserService.addManager(userEmail, managerId);

      return successResponse(res, 200, "Manager added successfully");
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getManagers(req, res) {
    try {
      const managers = await UserService.findAllManagers();
      if (managers == null) return errorResponse(res, 404, "No users not show");
      return successResponse(res, 200, "Managers found successfully", managers);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }
}
