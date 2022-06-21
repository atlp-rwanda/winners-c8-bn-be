import { jwt } from 'jsonwebtoken';
import { config } from 'config';
// eslint-disable-next-line consistent-return

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-auth-token']
  if (!token) return res.status(401).send('Access denied. No token provided!');
  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
      req.user =decoded;
      next();
  }
        
    
    catch (ex) {
      return res.status(401).json({error: "Invalid token"})
    }
  }
    // Assigned to Sosthene
    // const users = await User.findOne({
    //   where: { uuid: uuid }
    // });
    // if (!users) {
    //     return error('You are logged out! Please Log in', res);
    // }

  export default verifyToken;
