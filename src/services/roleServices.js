import { invalid } from "joi";
import { Role } from "../database/models";

class RoleService {
  static findRoleById = async (roleId) => {
    try {
      const role = await Role.findOne({ where: { id: roleId } });
      if (role == null) {
        return null;
      }
      return role;
    } catch (error) {
      return false;
    }
  };

  static findAllRoles = async () => {
    const roles = await Role.findAll();
    if (roles.length >= 1) {
      return roles;
    }
    return null;
  };

  static findRoleIdByName = async (roleName) => {
    const role = await Role.findOne({
      where: { roleName },
    });

    if (role) {
      return role.id;
    }

    return null;
  };
}

export default RoleService;
