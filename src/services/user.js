import { User, UserSession } from "../database/models";

class UserService {
  static async createUser(data) {
    const user = await User.create(data);
    return user;
  }

  static checkUser = async (email) => {
    const user = await User.findOne({ where: { email } });
    return user;
  };

  static verifyUserAccount = async (email) => {
    const data = await User.update(
      {
        verified: true,
      },
      {
        where: { email },
      }
    );
    return data;
  };
  /**
   *
   * @note - This method is to update the userSession like when he make request to know last time the token was used
   */
  //   static async updateUserSession(({ userId, token }) {
  //     const userSession = UserSession.findOne({ where:{ userId, token } });
  //     if (!userSession) return "";
  //     userSession.lastSession = new Date();
  //     await userSession.save();
  //     return userSession;
  //   }
  static async deleteSession({ userId, token }) {
    const userSession = UserSession.destroy({ where: { userId, token } });
    return userSession;
  }
}

export default UserService;
