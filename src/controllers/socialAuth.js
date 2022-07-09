/* eslint-disable */
import jwt from 'jsonwebtoken';
import userService from '../services/userService';
import Util from '../helpers/utils';
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
    return res.status(200).json({
      message: `authenticated at last!!!!`,
      body: req.user,
    });
    const googleSearch = await userService.findByProp({
      googleId: req.user.id,
    });
    const facebookSearch = await userService.findByProp({
      facebookId: req.user.id,
    });
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
        isVerified: req.user.emails[0].verified,
        googleId: google,
        facebookId: facebook,
      };
      const inserter = await userService.createuser(newUser);
      userGot = inserter.dataValues;
      Action = 'SignUp';
      status = 201;
    }
    const token = jwt.sign(
      {
        id: userGot.id,
        email: userGot.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '7d', // should expire in a week
      },
    );
    const message = `Welcome, ${Action} succesful `;
    const fullName = `${userGot.firstName} ${userGot.lastName} `
    const { email, roleId } = userGot
    const data = {
      id: userGot.id,
      email: userGot.email,
      TokenKey: token,
    };
    util.setSuccess(status, message, data);
    res.writeHead(302, {
      Location: `https://elite-staging.herokuapp.com/dashboard?name=${fullName}&email=${email}&roleId=${roleId}&token=${token}`
    });
    res.end();
    // return util.send(res);
  }
}
export default Social;