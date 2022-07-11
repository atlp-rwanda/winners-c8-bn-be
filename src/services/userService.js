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
 
  static updateAtt(set, prop) {
    return Users.update(set, {
      where: prop,
    });
  }
  static getUsers(id) {
    return Users.findAll(
      {
        where: {
          id,
          isVerified: 'true',
        },
        attributes: ['id', 'email', 'lineManager', 'isVerified'],
      },
    );
  }
//new
  static getUser() {
    return Users.findAll(
      {
        where: {
          isVerified: 'true',
          roleId: 4
        },
        attributes: ['id', 'email', 'lineManager', 'firstName'],
      },
    );
  }

  /**
   * Find a User in storage using login credentials.
   * @param {*} prop HTTP request
   * @returns {*} JSON data
   */
  static findByEmail(prop) {
    return Users.findOne({
      where: { email: prop },
    });
  }
  static findById(modelId) {
    return Users.findOne({
      where: { id: modelId },
    });
  }
  static drop(userEmail){
    return Users.drop({where: {
      email: userEmail
    }})
  }
  static deleteById(userId){
    return Users.destroy({
      where: { id: userId }
    })
  }
  static findBylineManagerId(lineManagerId){
    return Users.findOne({where:
    {id: lineManagerId},
  });

  }
}
export default UserService;
