import 'dotenv/config';
import Protection from "./hash";
import {User} from '../database/models';
import errorResponse from '../utils/error';

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1];



  if (!token) return res.status(401).send('Access denied. No token provided!');
  try {
    const decoded = await Protection.verifyToken(token);
    
    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) return errorResponse(res, 401, "Access denied. User not found");

    req.user =user;
    
    next();
  }
        
    
    catch (ex) {
      return res.status(401).json({error: "Invalid token"})

    }
  }

  export default verifyToken;
