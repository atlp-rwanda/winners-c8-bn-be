import { User, Role, UserSession } from "../database/models";

class UserService {
  static async createUser(data) {
    const user = await User.create(data);
    return user;
  }
  static checkUser = async (email) => {
    const user = await User.findOne({ where: { email } });
    return user;
  };
  static checkManager = async (userId) => {
    if (!userId) {
      return true;
    }
    const user = await User.findOne({ where: { id: userId } });
    if (user && user.user_role === "6927442b-84fb-4fc3-b799-11449fa62f52") {
      return true;
    }
    return false;
  };

  static verifyUserAccount = async (email) => {
    const data = await User.update(
      {
        isVerified: true,
      },
      {
        where: { email },
      }
    );
    return data;
  };

  static updateRole = async (email, roleId) => {
    const user = await User.findOne({ where: { email } });
    const newRole = await Role.findOne({ where: { id: roleId } });
    if (newRole == null) {
      return null;
    }
    user.user_role = newRole.id;
    await user.save();
    return user;
  };
	static verifyUserAccount = async (email) => {
		const data = await User.update({
							verified: true
						}, {
							where: { email }
						});
		return data;
	};

  static async createUserSession({ userId, token, loginDevice, lastSession }) {
    const userSession = await UserSession.create({
      userId,
      token,
      loginDevice,
      lastSession,
    });
    return userSession;
  }
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
  static async deleteSession(sessionId, userId, token) {
    const searchQuery = sessionId ? { id: sessionId } : { userId, token };

    const userSession = UserSession.destroy({ where: searchQuery });
    return userSession;
  }
}

export default UserService;
