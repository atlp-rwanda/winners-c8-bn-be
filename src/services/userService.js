/*eslint-disable */
import { User } from '../database/models';
const Users = User;
// const  Users  = models.User;
/**
 * @exports
 * @class UserService
 */
class UserService {
  /**
   * create new user
   * @static createuser
   * @param {object} newuser
   * @memberof userService
   * @returns {object} data
   */
  static createuser(newUser) {
    return Users.create(newUser);
  }
  static findByProp(prop) {
    return Users.findAll({
      where: prop,
    });
  }
}
export default UserService;
