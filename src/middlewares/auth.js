/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import Util from '../helpers/utils';
import userService from '../services/userService';

const util = new Util();

export const UserAuthentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = await jwt.verify(token, process.env.PRIVATE_KEY);
    const loggedIn = await userService.findByProp({ token });
    if (!loggedIn[0]) {
      const Error = 'Login first To continue';
      util.setError(401, Error);
      return util.send(res);
    }
    req.userData = decoded;
    next();
  } catch (error) {
    util.setError(500, error.message);
    return util.send(res);
  }
};
