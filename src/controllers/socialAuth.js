/* eslint-disable */
import jwt from 'jsonwebtoken';
import userService from '../services/userService';
import Util from '../helpers/utils';
import Protection from "../middlewares/hash";
import UserService2 from "../services/user";
import successResponse from "../utils/success";
import errorResponse from "../utils/error";

const { signToken } = Protection;
const util = new Util();
class Social {
  static async Oauth(req, res) {
    let Action;
    let status;
    let userGot;
    let google = null;
    let facebook = null;
    const column = `${req.user.provider}`;
    if (column === 'google') {
      google = req.user.id; 
    } else {
      facebook = req.user.id;
    } 
    // return res.status(200).json({
    //   message: `authenticated at last!!!!`,
    //   body: req.user,
    // });
    const googleSearch = await userService.findByProp({
      googleId: req.user.id,
    });
    const facebookSearch = await userService.findByProp({
      facebookId: req.user.id,
    });
    if(req.user.emails.length == 0) {
      return errorResponse(res, 403, `cannot login. the user's ${req.user.provider} account has no assigned email.`);
    }
    const exist = await userService.findByProp({
      email: req.user.emails[0].value,
    });
    if (googleSearch[0] || facebookSearch[0]) {
      if (!googleSearch[0]) {
        userGot = facebookSearch[0].dataValues;
      } else {
        userGot = googleSearch[0].dataValues;
      }
      Action = 'Log In';
      status = 200;
    } else if (exist[0]) {
      userGot = exist[0].dataValues;
      Action = 'Redirected by Email';
      status = 301;
    } else {

      const newUser = {
        firstName: req.user.name.familyName,
        lastName: req.user.name.givenName,
        email: req.user.emails[0].value,
        password: Math.random().toString(),
        isVerified: req.user.emails[0].verified,
        googleId: google,
        facebookId: facebook,
      };
      const inserter = await userService.createuser(newUser);
      userGot = inserter.dataValues;
      Action = 'SignUp';
      status = 201;
    }

    const token = await signToken({
        id: userGot.id,
        email: userGot.email,
        user_role: userGot.user_role,
        managerId: userGot.managerId,
      });
    
    const user = await UserService2.checkUser(userGot.email);
    await user.createUserSession({
      token,
      deviceType: req.headers["user-agent"],
      loginIp: req.ip,
      lastSessionTime: new Date(),
    });
    return successResponse(res, status, Action, token);
    
  }
}
export default Social;